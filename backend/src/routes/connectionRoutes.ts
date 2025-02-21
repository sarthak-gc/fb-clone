import express from "express";
import {
  acceptRequest,
  blockPerson,
  getAllFriend,
  getAllRequests,
  rejectRequest,
  searchUser,
  sendRequest,
  unfriend,
} from "../controllers/connection.controllers";
// import authorizationMiddleware from "../middlewares/authorizationMiddleware";

const connectionRoutes = express.Router();

connectionRoutes.post("/request/:userId", sendRequest);

connectionRoutes.post("/accept/:userId", acceptRequest);
connectionRoutes.get("/search/user/:name", searchUser);
connectionRoutes.get("/all", getAllFriend);

// connectionRoutes.use(authorizationMiddleware);
connectionRoutes.get("/requests/", getAllRequests);
connectionRoutes.post("/reject/:userId", rejectRequest);
connectionRoutes.delete("/remove/:userId", unfriend);
connectionRoutes.post("/block/:userId", blockPerson);
export default connectionRoutes;
