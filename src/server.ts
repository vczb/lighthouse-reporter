require("dotenv").config();
import express from "express";

import SessionController from "./app/controllers/session.controller";
import TriggerController from "./app/controllers/trigger.controller";
import ReportController from "./app/controllers/report.controller";
import authMiddleware from "./app/middlewares/auth.middleware";

import cors from "cors";
import bodyParser from "body-parser";
const { connectDB } = require("./database/mongodb");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

connectDB();

app.post("/api/signup", SessionController.signup);
app.post("/api/signin", SessionController.signin);

app.post(
  "/api/trigger/create",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  TriggerController.create
);
app.get(
  "/api/trigger/show",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  TriggerController.show
);
app.post(
  "/api/trigger/dispatch",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  TriggerController.dispatch
);
app.get(
  "/api/report/show",
  [authMiddleware.verifyToken, authMiddleware.verifyContentType],
  ReportController.show
);

app.listen(process.env.PORT || 3000);
