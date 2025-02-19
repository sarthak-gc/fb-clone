import mongoose from "mongoose";

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

enum RelationShip {
  Single = "single",
  Committed = "committed",
  Married = "married",
  Divorced = "divorced",
  Complicated = "complicated",
}
type userT = {
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: Gender;
  email: string;
  password: string;
  friends?: mongoose.Types.ObjectId[];
  friendRequestSent?: mongoose.Types.ObjectId[];
  friendRequestReceived?: mongoose.Types.ObjectId[];
  posts?: mongoose.Types.ObjectId[];
  address?: string;
  bio?: string;
  education?: string;
  working?: string;
  relationShip?: RelationShip;
  profilePicture?: String;
};

const User = new mongoose.Schema<userT>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: { type: [mongoose.Schema.Types.ObjectId], ref: "Friend" },
    friendRequestSent: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ReqSent",
    },
    friendRequestReceived: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ReqReceived",
    },
    posts: { type: [mongoose.Schema.Types.ObjectId], ref: "Post" },
    address: { type: String },
    bio: { type: String },
    education: { type: String },
    working: { type: String },
    relationShip: {
      type: String,
      enum: Object.values(RelationShip),
    },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<userT>("user", User);

export default UserModel;
