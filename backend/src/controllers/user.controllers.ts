import { Response, Request } from "express";
import UserModel from "../models/UserModel";
import { Purpose, sendMail } from "./sendMail";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_PASS as string;

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, birthday, gender, email, password } = req.body;

  if (!firstName || !birthday || !gender || !email || !password) {
    res.status(400).json({ message: "Please provide all required fields" });
    return;
  }

  if (!firstName.match(/^[a-zA-Z]+$/)) {
    res.status(400).json({ message: "Invalid first name" });
    return;
  }

  if (gender != "male" && gender != "female" && gender != "other") {
    res.status(400).json({ message: "Invalid gender" });
    return;
  }

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }

  const normalizedEmail = email.toLowerCase();
  if (password.length < 8) {
    res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
    return;
  }
  // const hashedPassword = await bcrypt.hash(password, 10);

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) {
    res.status(400).json({ message: "Invalid birthday format" });
    return;
  }
  const todayYear = new Date().getFullYear();
  const age = todayYear - birthDate.getFullYear();
  if (age < 18) {
    res.status(400).json({ message: "You must be at least 18 years old" });
    return;
  }
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.status(400).json({ message: "Account already exists with this email" });
    return;
  }

  const otp: number = Math.floor(100000 + Math.random() * 899999);

  sendMail(email, "User Registration", Purpose.Registration, otp);

  const { otpReceived } = req.body;
  if (otp != otpReceived) {
    res.status(400).json({ message: "Invalid OTP" });
    return;
  }

  await UserModel.create({
    firstName,
    lastName,
    birthday,
    gender,
    email: normalizedEmail,
    password,
    // password: hashedPassword,
  });

  const token = jwt.sign({ email }, secretKey);
  localStorage.setItem("token", token);
  res.status(200).json({ newUser: "New user registration successful" });
  return;
};

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please provide email and password" });
    return;
  }
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }
  const normalizedEmail = email.toLowerCase();

  const user = await UserModel.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (user.password != password) {
    res.status(403).json({ message: "Invalid Credentials" });
    return;
  }
  const token = jwt.sign({ email }, secretKey);

  res.status(200).json({ message: "Login successful", token });
};

const updatePersonalInfo = async (req: Request, res: Response) => {
  console.log("updatePersonalInfo");

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
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json({ message: "Info Updated Successfully" });
};
const getUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user: user });
};
const getUserTimeline = (req: Request, res: Response) => {
  console.log("getUserTimeline");
  // res.status(200).json({ timeline });
  res.status(200).json({ message: "User TimeLine Received" });
};
const userLogout = (req: Request, res: Response) => {
  res.status(200).json({ message: "User logout successful" });
};

export {
  registerUser,
  userLogin,
  updatePersonalInfo,
  getUserInfo,
  getUserTimeline,
  userLogout,
};
