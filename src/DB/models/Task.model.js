import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    items: [{ type: String }],
    type: { type: String, enum: ["text", "list"], required: true },
    shared: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const taskModel = model("Task", taskSchema);
