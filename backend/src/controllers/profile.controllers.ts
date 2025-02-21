import { Request, Response } from "express";
import UserModel from "../models/UserModel";

const getPersonalProfile = async (req: Request, res: Response) => {
  const id = req.id;
  if (!id) {
    res.status(411).json({ status: "error", message: "Id is expected" });
    return;
  }

  const personalInfo = "-id  -password  -createdAt -updatedAt -__v";
  const user = await UserModel.findOne({ _id: id }).select(personalInfo);

  if (!user) {
    res.status(404).json({ status: "error", message: "User not found" });
    return;
  }

  res
    .status(200)
    .json({ status: "success", message: "User found", data: { user } });
};

const updateBio = async (req: Request, res: Response) => {
  const { bio } = req.body;

  if (!bio) {
    res.status(400).json({ message: "Please provide bio" });
    return;
  }

  const updatedBio = await UserModel.findOneAndUpdate(
    { _id: req.id },
    { bio },
    { new: true }
  ).select("bio");

  if (!updatedBio) {
    res.status(404).json({ status: "error", message: "User not found" });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Bio updated successfully",
    data: {
      bio: updatedBio.bio,
    },
  });
};

const updateProfilePicture = async (req: Request, res: Response) => {
  const { profilePicture } = req.body;

  if (!profilePicture) {
    res.status(404).json({ message: "Profile picture not found" });
    return;
  }
  const user = await UserModel.findOneAndUpdate(
    { _id: req.id },
    { profilePicture },
    { new: true, runValidators: true }
  );

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json({ message: "Profile updated successfully" });
};

export { getPersonalProfile, updateBio, updateProfilePicture };
