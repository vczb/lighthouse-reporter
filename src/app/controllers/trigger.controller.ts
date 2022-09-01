import { Request, Response } from "express";
import generateLighthoseReport from "../../services/lighthouse";
const Trigger = require("../models/trigger.model");
const Report = require("../models/report.model");
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

      if (!trigger) {
        return res.status(404).send({ message: "Trigger Not found." });
      }

      res.status(200).send({
        trigger,
      });
    });
  },
  dispatch: async (req: Request & { userId?: string }, res: Response) => {
    const trigger = await Trigger.find({
      user: req.userId,
      name: req.body.name,
    }).catch((err: Error) => {
      console.log("err", err);
      res.status(500).send({ message: err });
      return;
    });

    if (!trigger?.length) {
      return res.status(404).send({ message: "Trigger Not found." });
    }

    res.status(200).send({
      ok: true,
      message: "Trigger was dispatched successfully",
    });

    const data = await generateLighthoseReport(trigger[0].pages);

    console.log("Report data:\n", data);

    const repport = await Report({
      user: req.userId,
      trigger: trigger[0].id,
      data,
    });

    repport
      .save()
      .then(() => {
        console.log("Report saved");
      })
      .catch((err: Error) => {
        console.log("err", err);
      });
  },
};

export default TriggerController;
