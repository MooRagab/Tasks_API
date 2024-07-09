import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    email: {
      type: String,
      unique: [true, "email must be unique value"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = model("User", userSchema);
