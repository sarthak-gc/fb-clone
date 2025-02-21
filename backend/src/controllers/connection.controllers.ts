import { Request, Response } from "express";
import FriendReqSentModel, {
  ReqSentStatus,
} from "../models/FriendReqSentModel";
import FriendReqReceivedModel, {
  ReqReceived,
} from "../models/FriendReqReceivedModel";
import FriendModel, { FriendShipStatus } from "../models/FriendsModel";
import mongoose from "mongoose";
import UserModel from "../models/UserModel";

const sendRequest = async (req: Request, res: Response) => {
  const { userId: receiver } = req.params;
  const sender = req.id;

  if (!receiver) {
    res
      .status(400)
      .json({ status: "error", message: "Receiver id is required" });
    return;
  }
  if (sender == receiver) {
    res
      .status(400)
      .json({ status: "error", message: "Can't send request to self" });
  }
  const requestExist = await FriendReqSentModel.find({
    sender,
    receiver,
    $or: [{ status: ReqSentStatus.Sent }, { status: ReqSentStatus.Rejected }],
  });

  if (requestExist.length > 0) {
    res.status(400).json({
      status: "error",
      message: "Can't send multiple requests to same person",
    });
    return;
  }
  await FriendReqSentModel.create({ sender, receiver });
  res.status(200).json({
    status: "success",
    message: "Request sent successfully",
    data: { sender, receiver },
  });
};

const getAllRequests = async (req: Request, res: Response) => {
  const id = req.id;
  const allRequests = await FriendReqReceivedModel.find({
    receiver: id,
  });

  if (allRequests.length === 0) {
    res.json({
      status: "success",
      message: "No friend requests found",
      data: { friendRequests: [] },
    });
    return;
  }

  res.json({
    status: "success",
    message: "All requests received",
    data: {
      friendRequests: allRequests,
    },
  });
};

const acceptRequest = async (req: Request, res: Response) => {
  const { userId: sender } = req.body;
  const receiver = req.id;
  const friendReq = await FriendReqSentModel.findOne({ sender, receiver });

  if (!friendReq) {
    res.status(404).json({ status: "error", message: "No request found" });
    return;
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  const friends = await FriendModel.create(
    {
      user1: sender,
      user2: receiver,
      friendShipStatus: FriendShipStatus.Active,
    },

    { session }
  );

  if (!friends) {
    await session.abortTransaction();
    res
      .status(400)
      .json({ status: "error", message: "Invalid request received" });
    return;
  }

  //  delete the values from these model on acceptance? or just update this?
  await Promise.all([
    FriendReqSentModel.findOneAndUpdate(
      { sender, receiver },
      { status: ReqSentStatus.Accepted },
      { session }
    ),
    FriendReqReceivedModel.findOneAndUpdate(
      { sender, receiver },
      { status: ReqReceived.Accepted },
      { session }
    ),
  ]);

  await session.commitTransaction();
  session.endSession();
  res.status(200).json({
    status: "success",
    message: "Request accepted",
    data: {
      sender,
      receiver,
    },
  });
};

const rejectRequest = async (req: Request, res: Response) => {
  const { userId: sender } = req.body;
  const receiver = req.id;
  const friendReq = await FriendReqSentModel.findOne({ sender, receiver });

  if (!friendReq) {
    res.json({ status: "error", message: "No request found" });
    return;
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  //  delete the values from these model on rejection? or just update this?
  await Promise.all([
    FriendReqSentModel.findOneAndUpdate(
      { sender, receiver },
      { status: ReqSentStatus.Rejected },
      { session }
    ),
    await FriendReqReceivedModel.findOneAndUpdate(
      { sender, receiver },
      { status: ReqReceived.Rejected },
      { session }
    ),
  ]);
  await session.commitTransaction();

  res.json({
    status: "success",
    message: "Request accepted",
    data: {
      sender,
      receiver,
    },
  });
};

const searchUser = async (req: Request, res: Response) => {
  // connectionRoutes.get("/search/user/:name", searchUser);
  // ? which one? lets think about it later .
  // const { name } = req.query;
  // const { name } = req.body;
  const { name } = req.params;

  const regex = new RegExp(name, "i");
  const users = await UserModel.find({
    $or: [{ firstName: regex }, { lastName: regex }],
  }).select("-email -password");
  if (users.length === 0) {
    res.status(404).json({ status: "error", message: "User not found" });
    return;
  }
  res.json({ status: "success", message: "Users Found", data: { users } });
};

const unfriend = async (req: Request, res: Response) => {
  const { userId: user1 } = req.params;
  const user2 = req.id;
  const friendShip = await FriendModel.findOneAndUpdate(
    {
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 },
      ],
      friendShipStatus: FriendShipStatus.Active,
    },
    {
      friendShipStatus: FriendShipStatus.Removed,
    },
    {
      new: true,
    }
  );

  if (!friendShip) {
    res.status(404).json({ status: "error", message: "Connection not found" });
    return;
  }

  res.json({
    status: "success",
    message: "Unfriended Successfully",
    data: {
      friendShip,
    },
  });
};
const getAllFriend = async (req: Request, res: Response) => {
  const user1 = req.id;

  const connection = await FriendModel.find({
    $and: [
      { friendShipStatus: FriendShipStatus.Active },
      { $or: [{ user1: user1 }, { user2: user1 }] },
    ],
  });

  if (connection.length == 0) {
    res.status(400).json({ status: "error", message: "No Friends Found" });
  }

  res.status(200).json({
    status: "success",
    message: "Friends Found",
    data: {
      connection,
    },
  });
};

const blockPerson = async (req: Request, res: Response) => {
  const { userId: user1 } = req.params;
  const user2 = req.id;

  const friendShip = await FriendModel.findOneAndUpdate(
    {
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 },
      ],
      friendShipStatus: FriendShipStatus.Active,
    },
    {
      friendShipStatus: FriendShipStatus.Blocked,
      blockedBy: user2,
    },
    {
      new: true,
    }
  );

  if (!friendShip) {
    res.status(404).json({
      status: "error",
      message: "Friendship not found or already removed",
    });
    return;
  }

  res.json({
    status: "success",
    message: "User blocked successfully",
    data: {
      friendShip,
    },
  });
};

export {
  sendRequest,
  getAllRequests,
  acceptRequest,
  rejectRequest,
  searchUser,
  unfriend,
  getAllFriend,
  blockPerson,
};
