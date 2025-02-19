import express from "express";
const messageRoutes = express();

// POST /messages: Send a new message to a user or group.
// GET /messages: Retrieve all messages between the logged-in user and their friends.
// GET /messages/:conversationId: Retrieve messages from a specific conversation.
// POST /messages/:conversationId/read: Mark messages as read in a conversation.

export default messageRoutes;
