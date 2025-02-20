import express from "express";
import profileRoutes from "./profileRoutes";
import {
  registerUser,
  getUserInfo,
  getUserTimeline,
  updatePersonalInfo,
  userLogin,
  userLogout,
} from "../controllers/user.controllers";
const userRoutes = express.Router();

userRoutes.use("/profile", profileRoutes);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", userLogin);
userRoutes.put("/profile", updatePersonalInfo);
userRoutes.get("/:userId", getUserInfo);
userRoutes.get("/:userId/timeline", getUserTimeline);
userRoutes.post("/logout", userLogout);

export default userRoutes;
