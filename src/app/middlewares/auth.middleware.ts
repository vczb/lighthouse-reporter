import { NextFunction, Response } from "express";
import { authConfig } from "../config/auth.config";
import jwt from 'jsonwebtoken'

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  // @ts-expect-error
  jwt.verify(token, authConfig.secret, (err: Error, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const verifyContentType = (req: any, res: Response, next: NextFunction) => {
  let token = req.headers["content-type"];

  if (!token) {
    return res.status(415).send({
      message:
        "'Content-type' header is not valid. Only 'application/json' is allowed.",
    });
  }

  next();
};

export default {
  verifyToken,
  verifyContentType,
};
