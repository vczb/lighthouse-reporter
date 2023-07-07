import { Request, Response } from "express";
import { TypedRequestBody, UserProps } from "../types";
import { User } from "../models/user.model";
const bcrypt = require("bcryptjs");

const UserController = {
  delete: async (req: Request & { userId?: string }, res: Response) => {
    try {
      if (!req.userId) return;

      const result = await User.delete(req.userId);

      if (result) {
        return res
          .status(200)
          .send({ ok: true, message: "User was deleted successfully." });
      }

      return res.status(500).send({ ok: false, message: "Failed to delete" });
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send({ ok: false, message: error });
    }
  },
  edit: async (req: TypedRequestBody<UserProps>, res: Response) => {
    try {
      if (!req.body?.email || !req.body?.password) {
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

      if (!req.userId) return;

      const result = await User.edit(req.userId, data);

      if (result) {
        return res
          .status(200)
          .send({ ok: true, message: "User was edited successfully." });
      }

      return res.status(500).send({ ok: false, message: "Failed to edit" });
    } catch (error) {
      console.log("Error", error);
      return res.status(500).send({ ok: false, message: error });
    }
  },
};

export default UserController;
