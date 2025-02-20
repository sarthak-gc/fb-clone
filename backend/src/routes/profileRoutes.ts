import express from "express";
import {
  getProfile,
  updateBio,
  updateProfilePicture,
} from "../controllers/profile.controllers";

const profileRoutes = express.Router();

profileRoutes.get("/:id", getProfile);
profileRoutes.put("/bio", updateBio);
profileRoutes.put("/picture", updateProfilePicture);

export default profileRoutes;
