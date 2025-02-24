import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { Purpose, sendMail } from "./sendMail";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import OtpModel, { otpT, Reasons } from "../models/otpModel";

dotenv.config();

const secretKey = process.env.JWT_PASS as string;

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, birthday, gender, email, password } =
    req.body.data;

  if (!firstName || !birthday || !gender || !email || !password) {
    res
      .status(400)
      .json({ status: "error", message: "Please provide all required fields" });
    return;
  }

  if (!firstName.match(/^[a-zA-Z]+$/)) {
    res.status(400).json({ status: "error", message: "Invalid first name" });
    return;
  }

  if (gender != "Male" && gender != "Female" && gender != "Other") {
    res.status(400).json({ status: "error", message: "Invalid gender" });
    return;
  }

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    res.status(400).json({ status: "error", message: "Invalid email format" });
    return;
  }

  const normalizedEmail = email.toLowerCase();
  if (password.length < 8) {
    res.status(400).json({
      status: "error",
      message: "Password must be at least 8 characters long",
    });
    return;
  }
  // const hashedPassword = await bcrypt.hash(password, 10);

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) {
    res
      .status(400)
      .json({ status: "error", message: "Invalid birthday format" });
    return;
  }
  const todayYear = new Date().getFullYear();
  const age = todayYear - birthDate.getFullYear();
  if (age < 18) {
    res
      .status(400)
      .json({ status: "error", message: "You must be at least 18 years old" });
    return;
  }
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.status(400).json({
      status: "error",
      message: "Account already exists with this email",
    });
    return;
  }

  const otp: number = Math.floor(100000 + Math.random() * 899999);

  const existingOtp = await OtpModel.findOne({ email });
  if (existingOtp) {
    res
      .status(400)
      .json({ status: "error", message: "Otp already sent to your email" });
    return;
  }

  await sendMail(email, "User Registration Request", Purpose.Registration, otp);

  const savedOtp = await OtpModel.create({
    firstName,
    lastName,
    birthday,
    gender: gender.toLowerCase(),
    email: normalizedEmail,
    password,
    otp,
    bio: "",
  });
  if (!savedOtp) {
    res.status(400).json({
      status: "error",
      message: "Error while creating otp for registration",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Otp Sent Successfully for registration",
  });
};

const verifyOtp = async (req: Request, res: Response) => {
  const { type } = req.params;
  const { email, otp } = req.body;
  let reason: string;
  if (type.toLowerCase().trim() == "resetpassword") {
    reason = Reasons.PasswordReset;
  } else if (type.toLowerCase().trim() == "register") {
    reason = Reasons.Registration;
  } else {
    res.status(400).json({ status: "error", message: "Invalid Request" });
    return;
  }

  const otpExists = (await OtpModel.findOne({
    email,
    reason,
  })) as otpT;

  if (!otpExists) {
    res.status(404).json({
      status: "error",
      message:
        reason === Reasons.Registration
          ? "Please register first to get otp in your email"
          : "Please send reset password request first",
    });
    return;
  }

  if (otpExists.otp != otp) {
    res.status(400).json({ status: "error", message: "Invalid Otp" });
    return;
  }

  if (reason == Reasons.PasswordReset) {
    const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    const updatedUser = await UserModel.updateOne(
      { email },
      { password },
      { new: true }
    );

    if (!updatedUser) {
      res
        .status(400)
        .json({ status: "error", message: " Error while reseting password" });
      return;
    }

    sendMail(
      email,
      "Password Reset",
      Purpose.PasswordResetSuccessful,
      undefined,
      password
    );
    const deletePass = await OtpModel.findOneAndDelete({
      email,
      reason: Reasons.PasswordReset,
    });

    if (!deletePass) {
      res.json({ status: "error", message: "Internal Error" });
      return;
    }
    res
      .status(200)
      .json({ status: "success", message: "Password reset successful" });
    return;
  }

  const user = await UserModel.create({
    firstName: otpExists.firstName,
    lastName: otpExists.lastName,
    birthday: otpExists.birthday,
    gender: otpExists.gender,
    email: otpExists.email,
    password: otpExists.password,
    // password: hashedPassword,
    bio: "",
  });

  if (!user) {
    res
      .status(400)
      .json({ status: "error", message: "Error while creating user" });
  }

  await OtpModel.deleteOne({
    email,
    reason,
  });
  const token = jwt.sign({ id: user._id }, secretKey, {
    expiresIn: "1h",
  });
  await sendMail(
    email,
    "User Registration Successfull",
    Purpose.RegistrationSuccessful
  );

  res.status(200).json({
    status: "success",
    message: "New user registration successful",
    data: { token },
  });
};

const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const reqExists = await OtpModel.findOne({
    email,
    reason: Reasons.PasswordReset,
  });

  if (reqExists) {
    res
      .status(400)
      .json({ status: "error", message: "Otp to reset password already send" });
    return;
  }

  const otp: number = Math.floor(100000 + Math.random() * 899999);

  const savedOtp = await OtpModel.create({
    email: email.toLowerCase(),
    otp,
    reason: Reasons.PasswordReset,
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    password: "",
    bio: "",
  });

  if (!savedOtp) {
    res.status(500).json({
      status: "error",
      message: "Error while creating OTP for password reset",
    });
    return;
  }

  await sendMail(email, "Password Reset Request", Purpose.PasswordReset, otp);
  res
    .status(200)
    .json({ status: "success", message: "Otp sent for password reset" });
};

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ status: "error", message: "Please provide email and password" });
    return;
  }
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    res.status(400).json({ status: "error", message: "Invalid email format" });
    return;
  }
  const normalizedEmail = email.toLowerCase();

  const user = await UserModel.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(404).json({ status: "error", message: "User not found" });
    return;
  }

  if (user.password != password) {
    res.status(403).json({ status: "error", message: "Invalid Credentials" });
    return;
  }
  const token = jwt.sign({ id: user._id }, secretKey);

  res
    .status(200)
    .json({ status: "success", message: "Login successful", token });
};

const updatePersonalInfo = async (req: Request, res: Response) => {
  const { bio, firstName, lastName } = req.body;
  const updates: any = {};

  if (bio) updates.bio = bio;
  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: req.id },
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    res.status(404).json({ status: "error", message: "User not found" });
    return;
  }
  res
    .status(200)
    .json({ status: "success", message: "Info Updated Successfully" });
};

const getUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const personalInfo =
    "-id -email -password -friendRequestSent -friendRequestReceived -createdAt -updatedAt -__v";
  const user = await UserModel.findOne({ _id: userId }).select(personalInfo);

  if (!user) {
    res.status(404).json({ status: "error", message: "User not found" });
    return;
  }
  res
    .status(200)
    .json({ status: "success", message: "User Found", data: { user } });
};
const getUserTimeline = (req: Request, res: Response) => {
  console.log("getUserTimeline");
  // res.status(200).json({ timeline });
  res.status(200).json({ message: "User TimeLine Received" });
};
const userLogout = (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "success", message: "User logout successful" });
};

export {
  registerUser,
  verifyOtp,
  resetPassword,
  userLogin,
  updatePersonalInfo,
  getUserInfo,
  getUserTimeline,
  userLogout,
};
