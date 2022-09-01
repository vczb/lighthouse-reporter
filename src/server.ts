require("dotenv").config();
import express from "express";

import SessionController from "./app/controllers/session.controller";
import TriggerController from "./app/controllers/trigger.controller";
import authMiddleware from "./app/middlewares/auth.middleware";

import cors from "cors";
import bodyParser from "body-parser";
const { connectDB } = require("./database/mongodb");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

connectDB();

app.post("/api/signup", SessionController.signup);
app.post("/api/signin", SessionController.signin);
app.post(
  "/api/trigger",
  [authMiddleware.verifyToken],
  TriggerController.create
);
app.get("/api/trigger", [authMiddleware.verifyToken], TriggerController.show);
app.post(
  "/api/trigger/dispatch",
  [authMiddleware.verifyToken],
  TriggerController.dispatch
);

app.listen(process.env.PORT || 3000);
