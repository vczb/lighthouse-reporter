import { Request, Response } from "express";
import { Error, TypedRequestBody, UserProps } from "../types";
import User from "../models/user.model";
import bcrypt from 'bcryptjs'

const UserController = {
  delete: async (req: Request & { userId?: string }, res: Response) => {
    await User.deleteOne({
      _id: req.userId,
    })
      .then((response: any) => {
        if (response.deletedCount > 0) {
          return res
            .status(200)
            .send({ ok: true, message: "User was deleted successfully." });
        } else {
          res.status(404).send({ message: "User not found." });
        }
      })
      .catch((err: Error) => {
        console.log("err", err);
        return res.status(500).send({ message: err });
      });
  },
  edit: async (req: TypedRequestBody<UserProps>, res: Response) => {
    if (!req.body?.email && !req.body?.password) {
      return res
        .status(400)
        .send({ message: "Invalid json message received." });
    }

    let data: Partial<UserProps> = {};

    if (req.body.email) {
      data.email = req.body.email;
    }

    if (req.body.password) {
      data.password = bcrypt.hashSync(req.body.password, 8);
    }

    await User.updateOne({ _id: req.userId }, data)
      .then(() => {
        return res
          .status(200)
          .send({ ok: true, message: "User was edited successfully." });
      })
      .catch((err: Error) => {
        console.log("err", err);
        return res.status(500).send({ message: err });
      });
  },
};

export default UserController;
