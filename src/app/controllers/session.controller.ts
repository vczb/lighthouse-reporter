import { Request, Response } from "express";
import { Error, UserProps } from "../types";
import User from "../models/user.model";
import { authConfig } from "../config/auth.config";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const SessionController = {
  signup: async (req: Request, res: Response) => {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    
    // @ts-expect-error
    user.save((err: Error, user: UserProps) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({
        message: "User was registered successfully!",
        user: { id: user.id, email: user.email },
      });
    });
  },
  signin: async (req: Request, res: Response) => {
    User.findOne({
      email: req.body.email, // @ts-expect-error
    }).exec((err: Error, user: UserProps) => {
      if (err) {
        console.log("err", err);
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        email: user.email,
        accessToken: token,
      });
    });
  },
};

export default SessionController;
