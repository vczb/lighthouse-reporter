import { Request, Response } from "express";
import Report from "../models/report.model";

const ReportController = {
  show: (req: Request & { userId?: string }, res: Response) => {
    Report.find({
      user: req.userId,
      name: req.query.name,
    }).exec((err: any, report: any) => {
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
