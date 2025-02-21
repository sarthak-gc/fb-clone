import express, { Request, Response } from "express";
import {
  getPersonalProfile,
  updateBio,
  updateProfilePicture,
} from "../controllers/profile.controllers";
// import authorizationMiddleware from "../middlewares/authorizationMiddleware";

const profileRoutes = express.Router();

// profileRoutes.use(authorizationMiddleware);

profileRoutes.get("/get", getPersonalProfile);
profileRoutes.put("/bio", updateBio);
profileRoutes.put("/picture", updateProfilePicture);

export default profileRoutes;
