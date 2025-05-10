import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { AdminModel, CourseModel } from "../db.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const adminRouter = Router();

const signupSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().min(3).max(100).email(),
  password: z.string().min(3).max(30),
});

const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  imageURL: z.string().url(),
});

const updateCourseSchema = courseSchema.extend({
  courseId: z.string().min(1),
});

adminRouter.post("/signup", async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", error: parsed.error.errors });
    }

    const { email, password, firstName, lastName } = parsed.data;

    const existing = await AdminModel.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    await AdminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "You are signed up!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

adminRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await AdminModel.findOne({ email });

    if (!response) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if (!passwordMatch) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { id: response._id.toString() },
      process.env.JWT_SECRET_ADMIN
    );

    res.json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

adminRouter.post("/course", adminAuth, async (req, res) => {
  try {
    const parsed = courseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid course data",
        error: parsed.error.errors,
      });
    }

    const { title, description, price, imageURL } = parsed.data;

    await CourseModel.create({
      title,
      description,
      price,
      imageURL,
      creatorId: req.adminId,
    });

    res.json({ message: "Course created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

adminRouter.put("/course", adminAuth, async (req, res) => {
  try {
    const parsed = updateCourseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid update data",
        error: parsed.error.errors,
      });
    }

    const { title, description, price, imageURL, courseId } = parsed.data;

    await CourseModel.updateOne(
      { _id: courseId, creatorId: req.adminId },
      {
        title,
        description,
        price,
        imageURL,
      }
    );

    res.json({ message: "Course updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

adminRouter.get("/course", adminAuth, async (req, res) => {
  try {
    const course = await CourseModel.find({ creatorId: req.adminId });
    res.json(course);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

export default adminRouter;
