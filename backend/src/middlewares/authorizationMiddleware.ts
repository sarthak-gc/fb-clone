// import { NextFunction, Request, Response } from "express";

// const authorizationMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const userId = req.id;
//   const { userId: owner } = req.body;

//   if (userId === owner) {
//     return next();
//   } else {
//     console.log(userId);
//     res.status(403).json({ status: "error", message: "Unauthorized" });
//     return;
//   }
// };
// export default authorizationMiddleware;
