import { Request, Response } from "express";
const Report = require("../models/report.model");

const ReportController = {
  show: (req: Request & { userId?: string }, res: Response) => {
    Report.find({
      user: req.userId,
      name: req.query.name,
    }).exec((err: Error, report: any) => {
      if (err) {
        console.log("err", err);
        res.status(500).send({ message: err });
        return;
      }

      if (!report) {
        return res.status(404).send({ message: "Report Not found." });
      }

      res.status(200).json({
        report,
      });
    });
  },
};

export default ReportController;
