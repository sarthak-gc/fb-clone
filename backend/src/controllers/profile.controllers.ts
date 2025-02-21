import { Request, Response } from "express";
import UserModel from "../models/UserModel";

const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(411).json({ message: "Id is expected" });
    return;
  }

  // get user without email and password;

  const user = await UserModel.findOne({ _id: id });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ message: "User found", user });
};
const updateBio = async (req: Request, res: Response) => {
  const { bio } = req.body;

  if (!bio) {
    res.status(400).json({ message: "Please provide bio" });
    return;
  }

  const updatedBio = await UserModel.findOneAndUpdate(
    { id: req.id },
    { new: true },
    { bio }
  ).select("bio");

  if (!updatedBio) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res
    .status(200)
    .json({ message: "Bio updated successfully", bio: updatedBio });
};
const updateProfilePicture = async (req: Request, res: Response) => {
  const { profilePicture } = req.body;

  if (!profilePicture) {
    res.status(404).json({ message: "Profile picture not found" });
    return;
  }
  const user = await UserModel.findOneAndUpdate(
    { _id: req.id },
    { profilePicture }
  );

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json({ message: "Profile updated successfully" });
};

export { getProfile, updateBio, updateProfilePicture };
