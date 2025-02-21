import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/UserModel";

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ status: "error", message: "No token provided" });
    return;
  }

  try {
    const decodedToken = jsonwebtoken.verify(
      token,
      process.env.JWT_PASS as string
    ) as JwtPayload;

    const user = await UserModel.findOne({ _id: decodedToken.id });
    if (!user) {
      res.status(403).json({ status: "error", message: "User not found" });
      return;
    }

    req.id = decodedToken.id;
    next();
  } catch (err) {
    res.status(403).json({ status: "error", message: "Invalid token" });
    return;
  }
};

export default authenticationMiddleware;
