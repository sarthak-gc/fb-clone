import express from "express";
import connectionRoutes from "./connectionRoutes";
import postRoutes from "./postRoutes";
import userRoutes from "./userRoutes";
import messageRoutes from "./messageRoutes";

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/post", postRoutes);
routes.use("/connection", connectionRoutes);
routes.use("/message", messageRoutes);

export default routes;
