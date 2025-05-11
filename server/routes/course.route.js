import { Router } from "express";
import { z } from "zod";
import dotenv from "dotenv";

import { PurchaseModel, CourseModel } from "../db.js";
import { userAuth } from "../middleware/authMiddleware.js";

dotenv.config();

const courseRouter = Router();

const purchaseSchema = z.object({
  courseId: z.string().min(1),
});

courseRouter.post("/purchase", userAuth, async (req, res) => {
  try {
    const parsed = purchaseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid course data",
        error: parsed.error.errors,
      });
    }

    const { courseId } = parsed.data;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existingPurchase = await PurchaseModel.findOne({
      userId: req.userId,
      courseId,
    });

    if (existingPurchase) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    await PurchaseModel.create({
      userId: req.userId,
      courseId,
    });

    res.json({ message: "Purchased successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

courseRouter.get("/preview", async (req, res) => {
  try {
    const course = await CourseModel.find();
    res.json({course});
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

export default courseRouter ;
