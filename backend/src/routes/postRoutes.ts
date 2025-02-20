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

postRoutes.post("/posts/create", createPost);
postRoutes.get("/posts", getAllPost);
postRoutes.get("/posts/:userId", getUserPosts);
postRoutes.get("/posts/:postId", getPost);
postRoutes.put("/posts/:postId", editPost);
postRoutes.delete("/posts/:postId", deletePost);
postRoutes.post("/posts/:postId/like", likePost);
postRoutes.get("/posts/:postId/like", getLikeCount);
postRoutes.post("/posts/:postId/comment", addPostComment);
postRoutes.get("/posts/:postId/comments/", getPostComments);

export default postRoutes;
