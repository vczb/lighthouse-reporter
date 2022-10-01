import { Request, Response } from "express";
import { Document } from "mongoose";
import generateLighthoseReport from "../../services/lighthouse";
import { Error, GroupProps } from "../types";
const Trigger = require("../models/trigger.model");
const Report = require("../models/report.model");

const TriggerController = {
  create: async (req: Request & { userId?: string }, res: Response) => {
    const { name, pages } = req.body;

    if (!name || !pages.length || !req?.userId) {
      return res
        .status(400)
        .send({ message: "Invalid json message received." });
    }

    const trigger = await new Trigger({
      user: req.userId,
      name: req.body.name,
      pages: req.body.pages,
    });

    trigger.save((err: Error, trigger: Document<GroupProps>) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.json({
        message: "Trigger was create successfully!",
        trigger,
      });
    });
  },
  show: (req: Request & { userId?: string }, res: Response) => {
    Trigger.find({
      user: req.userId,
    }).exec((err: Error, trigger: Document<GroupProps>[]) => {
      if (err) {
        console.log("err", err);
        res.status(500).send({ message: err });
        return;
      }

      if (!trigger) {
        return res.status(404).send({ message: "Trigger Not found." });
      }

      res.status(200).json({
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
      name: trigger[0].name,
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
