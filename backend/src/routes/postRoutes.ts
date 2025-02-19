import express from "express";
const postRoutes = express.Router();

// POST /posts: Create a new post.
// GET /posts: Retrieve all posts (or specific posts based on user, friends, etc.).
// GET /posts/:postId: View a specific post by its ID.
// PUT /posts/:postId: Edit a post.
// DELETE /posts/:postId: Delete a post.
// POST /posts/:postId/like: Like a post.
// POST /posts/:postId/comment: Add a comment to a post.
// GET /posts/:postId/comments: Get all comments for a specific post.

export default postRoutes;
