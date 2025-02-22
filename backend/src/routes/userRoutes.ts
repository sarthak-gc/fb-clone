import express from "express";
import profileRoutes from "./profileRoutes";
import {
  registerUser,
  getUserInfo,
  getUserTimeline,
  updatePersonalInfo,
  userLogin,
  userLogout,
  verifyOtp,
  resetPassword,
} from "../controllers/user.controllers";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";
// import authorizationMiddleware from "../middlewares/authorizationMiddleware";
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/:type/verifyotp", verifyOtp);

userRoutes.post("/login", userLogin);

userRoutes.use(authenticationMiddleware);

userRoutes.post("/resetpassword", resetPassword);
userRoutes.use("/profile", profileRoutes);
userRoutes.put("/profile", updatePersonalInfo);
userRoutes.get("/:userId", getUserInfo);
userRoutes.get("/:userId/timeline", getUserTimeline);
userRoutes.post("/logout", userLogout);

export default userRoutes;
