import mongoose from "mongoose";

type commentT = {
  post: mongoose.Types.ObjectId;
  commenter: mongoose.Types.ObjectId;
  replies: mongoose.Types.ObjectId[];
  reactions?: Number;
};

const comment = new mongoose.Schema<commentT>(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    reactions: { type: Number },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", comment);

export default CommentModel;
