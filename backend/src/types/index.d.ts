import { JwtPayload } from "jsonwebtoken";

export {};

declare global {
  namespace Express {
    interface Request {
      id: JwtPayload | string;
      email: string;
    }
  }
}
