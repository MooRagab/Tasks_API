import { Schema, model, Types } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      minlength: [2, "minimum length 2 char"],
      maxlength: [20, "max length 2 char"],
    },
    description: {
      type: String,
      required: [true, "Discription field is required"],
      minlength: [10, "Minimum length is 10 characters"],
      maxlength: [200, "Maximum length is 200 characters"],
    },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const categoryModel = model("Category", CategorySchema);
