import mongoose from "mongoose";

const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const userField = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
};

const AdminSchema = new Schema(userField, { timestamps: true });

const UserSchema = new Schema(userField, { timestamps: true });

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    imageURL: String,
    creatorId: { type: ObjectId, ref: "admins", required: true },
  },
  { timestamps: true }
);

const PurchaseSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "users" },
    courseId: { type: ObjectId, ref: "courses" },
  },
  { timestamps: true }
);

const AdminModel = model("admins", AdminSchema);
const UserModel = model("users", UserSchema);
const CourseModel = model("courses", CourseSchema);
const PurchaseModel = model("purchases", PurchaseSchema);

export { AdminModel, UserModel, CourseModel, PurchaseModel };
