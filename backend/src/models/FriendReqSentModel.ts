import mongoose from "mongoose";

enum ReqSentStatus {
  Sent = "sent",
  Accepted = "accepted",
  Rejected = "rejected ",
}
type friendRequestSentT = {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  status: ReqSentStatus;
};

const FriendReqSent = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId },
    receiver: { type: mongoose.Schema.Types.ObjectId },
    status: {
      type: String,
      enum: Object.values(ReqSentStatus),
      default: ReqSentStatus.Sent,
    },
  },
  { timestamps: true }
);

const FriendReqSentModel = mongoose.model<friendRequestSentT>(
  "friendReqSent",
  FriendReqSent
);
export default FriendReqSentModel;
