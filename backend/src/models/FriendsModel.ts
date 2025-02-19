import mongoose from "mongoose";

enum FriendShipStatus {
  Active = "active",
  Blocked = "blocked",
  Removed = "removed",
}

type friendT = {
  user1: mongoose.Types.ObjectId;
  user2: mongoose.Types.ObjectId;
  friendShipStatus: FriendShipStatus;
  connectedDate: Date;
};

const friend = new mongoose.Schema<friendT>(
  {
    //! Have to do something to prevent double relations like A is a friend of B is enough to get that B is a friend of A .
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    friendShipStatus: {
      type: String,
      enum: Object.values(FriendShipStatus),
      default: FriendShipStatus.Active,
    },
    connectedDate: { type: Date },
  },
  { timestamps: true }
);

const FriendModel = mongoose.model("friend", friend);

export default FriendModel;
