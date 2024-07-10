import { userModel } from "../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/email.js";
import { asyncHandler } from "../services/errorHandling.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { email, userName, password, age } = req.body;
  const user = await userModel.findOne({ email }).select("email");
  if (user) {
    next(Error("E-mail already Exist", { cause: 409 }));
  } else {
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const newUser = new userModel({
      email,
      password: hash,
      userName,
      age,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.EMAILTOKEN, {
      expiresIn: "1h",
    });
    const link = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}/auth/confirmemail/${token}`;
    const message = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Email Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            margin: 0;
            color: #007BFF;
        }
        .content {
            margin: 20px 0;
            line-height: 1.6;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px;
            text-align: center;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Confirmation</h1>
        </div>
        <div class="content">
            <p>Hi ${userName},</p>
            <p>Thank you for registering with us. Please confirm your email address by clicking the button below:</p>
            <a href="${link}" class="button">Confirm Email</a>
            <p>If you did not create an account, please ignore this email.</p>
           
        </div>
        <div class="footer">
            <p>&copy; 2024 RAGAB. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
    const info = await sendEmail(email, "Confirm Email", message);
    if (info?.accepted?.length) {
      const savedUser = await newUser.save();
      res.status(201).json({ message: "Done successfully" });
    } else {
      next(Error("E-mail Is Rejected", { cause: 400 }));
    }
  }
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.EMAILTOKEN);

  if (!decoded?.id) {
    next(Error("In-Valid PayLoad", { cause: 400 }));
  } else {
    const user = await userModel.findOneAndUpdate(
      { _id: decoded.id, confirmEmail: false },
      { confirmEmail: true }
    );
    if (!user) {
      next(
        Error("E-mail Is Already Confirmed", {
          cause: 409,
        })
      );
    } else {
      res.status(200).json({ message: "Confirmed" });
    }
  }
});
