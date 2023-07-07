import { Request, Response } from "express";
import { User } from "../models/user.model";

const SessionController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await User.create(email, password);

      res.send({
        message: "User was registered successfully!",
        user: { id: result["_id"], email },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  signin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(404).send({ message: "Invalid params" });
      }

      const result = await User.authenticate(email, password);

      if (result && result?.accessToken) {
        return res.status(200).send(result);
      }

      return res.status(404).send({ message: "Failed to authenticate" });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

export default SessionController;
