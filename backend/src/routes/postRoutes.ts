import express from "express";
const postRoutes = express.Router();

import {
  createPost,
  getAllPost,
  getUserPosts,
  getPost,
  editPost,
  deletePost,
  likePost,
  getLikeCount,
  addPostComment,
  getPostComments,
} from "../controllers/post.controllers";

// import authorizationMiddleware from "../middlewares/authorizationMiddleware";

postRoutes.post("/create", createPost);
postRoutes.get("/getall", getAllPost);
postRoutes.get("/:postId", getPost);
postRoutes.get("/user/:userId", getUserPosts);
postRoutes.put("/:postId", editPost);
postRoutes.delete("/:postId", deletePost);
postRoutes.post("/:postId/like", likePost);
postRoutes.get("/:postId/like", getLikeCount);
postRoutes.post("/:postId/comments", addPostComment);
postRoutes.get("/:postId/comments/", getPostComments);

export default postRoutes;
