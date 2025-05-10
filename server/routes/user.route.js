import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import dotenv from "dotenv";

import { UserModel, PurchaseModel } from "../db.js";
import { userAuth } from "../middleware/authMiddleware.js";

dotenv.config();

const userRouter = express.Router();

const userSignupSchema = z.object({
  email: z.string().min(3).max(100).email(),
  password: z.string().min(3).max(30),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
});

const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const parsed = userSignupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: parsed.error.errors,
      });
    }

    const { email, password, firstName, lastName } = parsed.data;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(201).json({ message: "You are signed up!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const parsed = userSigninSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        error: parsed.error.errors,
      });
    }

    const { email, password } = parsed.data;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET_USER
    );

    res.json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRouter.get("/purchases", userAuth, async (req, res) => {
  try {
    const courses = await PurchaseModel.find({ userId: req.userId });
    res.json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default userRouter;
