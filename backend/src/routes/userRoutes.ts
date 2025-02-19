import express from "express";
const userRoutes = express.Router();

// POST /users/register: To create a new user (sign up).
// POST /users/login: For user login/authentication.
// GET /users/profile: Get details of the logged-in user’s profile.
// PUT /users/profile: Update user profile information (e.g., name, bio, etc.).
// GET /users/:userId: View another user’s profile.
// PUT /users/:userId: Update another user's profile (if authorized).
// DELETE /users/:userId: Delete a user's profile (optional, if implementing).
// POST /users/logout: Logout user from the session.

export default userRoutes;
