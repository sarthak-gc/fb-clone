import mongoose from "mongoose";
import { Gender } from "./UserModel";

enum Reasons {
  Registration = "registration",
  PasswordReset = "passwordReset",
}

type otpT = {
  firstName: string;
  lastName?: string;
  birthday: Date;
  gender: Gender;
  email: string;
  password: string;
  otp: number;
  bio?: string;
  reason: Reasons;
};
const Otp = new mongoose.Schema<otpT>({
  email: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  birthday: { type: Date, required: true },
  gender: { type: String, enum: Object.values(Gender), required: true },
  password: { type: String, required: true },
  bio: { type: String },
  reason: {
    type: String,
    enum: Object.values(Reasons),
    default: Reasons.Registration,
    required: true,
  },
});

const OtpModel = mongoose.model("otp", Otp);
export default OtpModel;

export { otpT, Reasons };
