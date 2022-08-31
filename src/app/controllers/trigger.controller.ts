import { Request, Response } from "express";
const Trigger = require("../models/trigger.model");
import { Error, GroupProps } from "../types";

const TriggerController = {
  create: (req: Request & { userId?: string }, res: Response) => {
    const trigger = new Trigger({
      user: req.userId,
      name: req.body.name,
      pages: req.body.pages,
    });

    trigger.save((err: Error, trigger: GroupProps) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({
        message: "Trigger was create successfully!",
        trigger,
      });
    });
  },
  show: (req: Request & { userId?: string }, res: Response) => {
    Trigger.find({
      user: req.userId,
    }).exec((err: Error, trigger: any) => {
      if (err) {
        console.log("err", err);
        res.status(500).send({ message: err });
        return;
      }

      console.log("trigger", trigger);

      if (!trigger) {
        return res.status(404).send({ message: "Collection Not found." });
      }

      res.status(200).send({
        trigger,
      });
    });
  },
};

export default TriggerController;
