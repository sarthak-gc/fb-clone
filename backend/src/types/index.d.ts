import mongoose from "mongoose";

export {};

declare global {
  namespace Express {
    interface Request {
      id: mongoose.Types.ObjectId | string;
    }
  }
}
