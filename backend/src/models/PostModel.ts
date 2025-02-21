import mongoose from "mongoose";

type postT = {
  owner: mongoose.Types.ObjectId;
  reactions: Number;
  reactors: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  content: String;
};

const Post = new mongoose.Schema<postT>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: {
      type: Number,
      default: 0,
    },
    reactors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel = mongoose.model<postT>("post", Post);

export default PostModel;
export { postT };
