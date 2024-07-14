import connectDB from "../src/DB/connection.js";
import authRouter from "../src/routes/registration.router.js";
import categoryRouter from "../src/routes/category.route.js";
import userRouter from "../src/routes/user.route.js";
import taskRouter from "../src/routes/task.route.js";
import express from "express";
import { globalErrorHandler } from "../src/services/errorHandling.js";

export const appRouter = (app) => {
  //convert Buffer Data

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //SetUp API Routings

  app.use("/auth", authRouter);
  app.use("/category", categoryRouter);
  app.use("/task", taskRouter);
  app.use("/user", userRouter);

  //in-valid Page

  app.use("*", (req, res, next) => {
    res.status(404).send("404 Error Page Not Found");
  });

  //Error Handling

  app.use(globalErrorHandler);

  //Connect To DB Server

  connectDB();
};
