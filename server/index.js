import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import  adminRouter  from "./routes/admin.route.js";
import userRouter  from "./routes/user.route.js";
import  courseRouter  from "./routes/course.route.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/course", courseRouter);

function main() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Mongodb Connected!");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
}

main();
