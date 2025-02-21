import mongoose from "mongoose";

enum ReqReceived {
  Received = "received",
  Accepted = "accepted",
  Rejected = "rejected ",
}
type friendRequestReceivedT = {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  status: ReqReceived;
};

const FriendReqReceived = new mongoose.Schema<friendRequestReceivedT>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId },
    receiver: { type: mongoose.Schema.Types.ObjectId },
    status: {
      type: String,
      enum: Object.values(ReqReceived),
      default: ReqReceived.Received,
    },
  },
  { timestamps: true }
);

const FriendReqReceivedModel = mongoose.model<friendRequestReceivedT>(
  "friendReqReceived",
  FriendReqReceived
);
export default FriendReqReceivedModel;

export { friendRequestReceivedT, ReqReceived };
