import mongoose from "mongoose";

enum messageSentStatus {
  Sent = "sent",
  Delivered = "delivered",
  Sending = "sending",
  Failed = "failed",
}

type messageT = {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  seenAt?: Date;
  sentStatus: messageSentStatus;
};

const Message = new mongoose.Schema<messageT>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seenAt: { type: Date, required: false },
    sentStatus: {
      type: String,
      enum: Object.values(messageSentStatus),
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<messageT>("message", Message);

export default MessageModel;
