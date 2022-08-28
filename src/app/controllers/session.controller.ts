import { Request, Response } from "express";
import { Error, User } from "../types";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dbCon = require("../models");
const config = require("../config/auth.config");

const User = dbCon.user;

const SessionController = {
  signup: async (req: Request, res: Response) => {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err: Error, user: User) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "User was registered successfully!", user });
    });
  },
  signin: async (req: Request, res: Response) => {
    User.findOne({
      email: req.body.email,
    }).exec((err: Error, user: User) => {
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

      const token = jwt.sign({ id: user.id }, config.secret, {
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
