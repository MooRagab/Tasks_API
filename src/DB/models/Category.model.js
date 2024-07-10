import { Schema, model, Types } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    description: { type: String, required: true },
    shared: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const categoryModel = model("Category", CategorySchema);
