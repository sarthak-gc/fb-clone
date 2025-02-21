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
const connectionRoutes = express.Router();

connectionRoutes.post("/request/:userId");

connectionRoutes.post("/request/:userId", sendRequest);
connectionRoutes.get("/requests/", getAllRequests);
connectionRoutes.post("/accept/:userId", acceptRequest);
connectionRoutes.post("/reject/:userId", rejectRequest);
connectionRoutes.get("/search/user/:name", searchUser);
connectionRoutes.delete("/remove/:userId", unfriend);
connectionRoutes.get("/block/:userId", blockPerson);
connectionRoutes.get("/all", getAllFriend);
export default connectionRoutes;
