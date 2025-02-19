import express from "express";
const connectionRoutes = express.Router();

connectionRoutes.post("/request/:userId");
// POST /friends/request/:userId: Send a friend request to another user.
// GET /friends/requests: View pending friend requests.
// POST /friends/accept/:userId: Accept a pending friend request.
// POST /friends/reject/:userId: Reject a pending friend request.
// DELETE /friends/:userId: Unfriend a user.
// GET /friends: List all friends of the logged-in user.
connectionRoutes.get("/requests/");
connectionRoutes.post("/accept/:userId");
connectionRoutes.post("/reject/:userId");
connectionRoutes.delete("/reject/:userId");

connectionRoutes.get("/all");

export default connectionRoutes;
