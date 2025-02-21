import { Request, Response } from "express";
import PostModel, { postT } from "../models/PostModel";
import CommentModel from "../models/CommentModel";
import mongoose from "mongoose";
import UserModel from "../models/UserModel";

const createPost = async (req: Request, res: Response) => {
  const { postContent } = req.body;

  if (!postContent) {
    res
      .status(400)
      .json({ status: "error", message: "Post content is required" });
    return;
  }

  const post = await PostModel.create({ owner: req.id, content: postContent });

  await UserModel.findByIdAndUpdate(
    { _id: req.id },
    { $push: { posts: post._id } }
  );

  if (!post) {
    res.status(400).json({ status: "error", message: "Error creating post" });
    return;
  }
  res.status(200).json({
    status: "success",
    message: "Post created successfully",
    data: { content: postContent },
  });
};

const getAllPost = async (req: Request, res: Response) => {
  // ! do something to handle pagination or filtering .
  const post = await PostModel.find({}).select(
    "-_id -createdAt -updatedAt -__v"
  );
  if (post.length == 0) {
    res.status(200).json({
      status: "success",
      message: "No Posts found",
      data: {
        posts: [],
      },
    });
    return;
  }
  res.status(200).json({
    status: "success",
    message: "All posts received",
    data: { posts: post },
  });
};

const getUserPosts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ status: "error", message: "User id is required" });
    return;
  }
  const post = await PostModel.find({ owner: userId }).select("-_id -__v");
  if (!post) {
    res.status(404).json({ status: "error", message: "Post not found" });
    return;
  }

  res
    .status(200)
    .json({ status: "success", message: "Post found", data: { post } });
};

const getPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(400).json({ status: "error", message: "Post id is required" });
    return;
  }
  const post = await PostModel.findById(postId);
  if (!post) {
    res.status(404).json({ status: "error", message: "Post not found" });
    return;
  }

  res
    .status(200)
    .json({ status: "success", message: "Post found", data: { post } });
};

const editPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { postContent } = req.body;

  if (!postId) {
    res.status(400).json({ status: "error", message: "Post id required" });
    return;
  }
  if (!postContent) {
    res
      .status(400)
      .json({ status: "error", message: "Post content is required" });
    return;
  }

  const post = (await PostModel.findOne({ _id: postId })) as postT;
  console.log(post);
  if (!post) {
    res.status(404).json({ status: "error", message: "Post not found" });
    return;
  }

  if (post.owner.toString() != req.id.toString()) {
    res
      .status(403)
      .json({ status: "error", message: "Unauthorized to edit this post" });
    return;
  }

  if (post.content === postContent) {
    res
      .status(400)
      .json({ status: "error", message: "No changes made to post" });
    return;
  }

  if (!postContent) {
    res.status(400).json({
      status: "error",
      message: "Post content is required for update",
    });
    return;
  }

  // ! save the old posts into a new table before updating them .

  const updatedPost = await PostModel.findOneAndUpdate(
    { _id: postId },
    { content: postContent },
    { new: true, runValidators: true }
  );

  if (!updatedPost) {
    res.status(404).json({ status: "error", message: "Post not found" });
  }
  res.json({
    status: "success",
    message: "Post updated successfully",
    data: { post: updatedPost },
  });
};
const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(400).json({ status: "error", message: "Post id is required" });
    return;
  }
  const post = await PostModel.findById(postId);
  if (!post) {
    res.status(404).json({ status: "error", message: "Post not found" });
    return;
  }

  if (post.owner.toString() != req.id.toString()) {
    res
      .status(403)
      .json({ status: "error", message: "Unauthorized to delete this post" });
    return;
  }

  // ! save the old posts into a new table before deleting them .
  const deletedPost = await PostModel.findByIdAndDelete(postId);
  if (!deletedPost) {
    res.json({ status: "error", message: "Failed to delete post" });
  }

  res.json({ status: "success", message: "Post deleted successfully" });
};

const likePost = async (req: Request, res: Response) => {
  const userId = req.id as mongoose.Types.ObjectId;

  const { postId } = req.params;
  if (!postId) {
    res.status(404).json({ status: "error", message: "Post id required" });
    return;
  }
  const post = (await PostModel.findOne({ _id: postId })) as postT;
  if (!post) {
    res.status(404).json({ status: "error", message: "Post not found" });
    return;
  }

  if (userId.toString() === post.owner.toString()) {
    res
      .status(400)
      .json({ status: "error", message: "You cannot like your own post" });
    return;
  }

  if (post.reactors.includes(userId)) {
    res
      .status(411)
      .json({ status: "error", message: "You have already liked this post" });
    return;
  }

  const likedPost = (await PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { reactions: 1 }, $push: { reactors: userId } },
    { new: true, runValidators: true }
  )) as postT;

  if (!likedPost) {
    res.status(404).json({ status: "error", message: "Error liking the post" });
    return;
  }
  res.status(200).json({
    status: "success",
    message: "Post liked successfully",
    data: { likedPost: likedPost.reactions },
  });
};

const getLikeCount = async (req: Request, res: Response) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(404).json({ status: "error", message: "Post id required" });
    return;
  }
  const post = (await PostModel.findOne({ _id: postId })) as postT;

  if (!post) {
    res.status(404).json({ status: "error", message: "Post not found" });
    return;
  }

  const reactors = post.reactors;

  let reactorsList = [];

  reactorsList = await Promise.all(
    reactors.map(async (elem) => {
      const reactor = await UserModel.findOne({ _id: elem }).select(
        "firstName lastName"
      );
      return reactor;
    })
  );

  res.json({
    status: "success",
    message: "Like count received successfully",
    data: { reactors: reactorsList, reactions: post.reactions },
  });
};

const addPostComment = async (req: Request, res: Response) => {
  const userId = req.id;
  const { postId } = req.params;
  const { comment } = req.body;

  console.log(userId, postId, comment);

  if (!userId) {
    res.status(404).json({ status: "error", message: "User does not exist" });
    return;
  }
  if (!postId) {
    res.status(400).json({ status: "error", message: "Post id required" });
    return;
  }
  if (!comment) {
    res.status(400).json({ status: "error", message: "Comment  is necessary" });
    return;
  }
  const postComment = await CommentModel.create({
    content: comment,
    post: postId,
    commenter: userId,
  });

  const neededInformation = await CommentModel.findOne({
    _id: postComment._id,
  }).select("-replies -reactions -_id -createdAt -updatedAt -__v");
  const post = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: postComment._id } },
    { new: true }
  );

  if (!post) {
    res.status(404).json({ status: "error", message: "Post not found" });
    return;
  }

  res.json({
    status: "success",
    message: "Comment added successfully",
    data: {
      comment: neededInformation,
    },
  });
};

const getPostComments = async (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(404).json({ status: "error", message: "Post id required" });
    return;
  }

  const comments = await CommentModel.find({ post: postId }).select(
    "-_id -post  -__v -updatedAt "
  );

  if (!comments) {
    res.json({
      status: "success",
      message: "No comments found",
      data: {
        comments: [],
      },
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Comments retrieved successfully",
    data: {
      comments,
    },
  });
};

// const removePostReaction = async (req: Request, res: Response) => {
//   const userId = req.id;

//   const { postId } = req.params;
//   if (!postId) {
//     res.status(404).json({status:"error", message: "Post id required" });
//     return;
//   }
//   const post = await PostModel.find({ _id: postId });
//   if (!post) {
//     res.status(404).json({status:"error", message: "Post not found" });
//     return;
//   }

//   // if (post.reactors.includes(userId)) {
//   // res.status(411).json({ message: "You have already liked this post" });
//   // return;
//   // }
//   const likedPost = await PostModel.findOneAndUpdate(
//     { _id: postId },
//     { $inc: { reactions: 1 }, $push: { reactors: userId } },
//     { new: true }
//   );

//   res.status(200).json({ status:"success",message: "Post liked successfully", likedPost });
// };

// const dislikePost = async (req: Request, res: Response) => {
//   const userId = req.id;

//   const { postId } = req.params;
//   if (!postId) {
//     res.status(404).json({status:"error", message: "Post id required" });
//     return;
//   }
//   const post = await PostModel.find({ _id: postId });
//   if (!post) {
//     res.status(404).json({status:"error", message: "Post not found" });
//     return;
//   }

//   // if (post.reactors.includes(userId)) {
//   // res.status(411).json({ message: "You have already liked this post" });
//   // return;
//   // }
//   const likedPost = await PostModel.findOneAndUpdate(
//     { _id: postId },
//     { $inc: { reactions: 1 }, $push: { reactors: userId } },
//     { new: true }
//   );

//   res.status(200).json({ status:"success",message: "Post liked successfully", likedPost });
// };

// const deleteComments = async (req: Request, res: Response) => {
//   console.log("getPostComments");
// };

export {
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
};
