require("dotenv").config();
import express from "express";
import SessionController from "./app/controllers/session.controller";
import cors from "cors";
import bodyParser from "body-parser";
import { Error } from "./app/types";

const db = require("./app/models");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

db.mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err: Error) => {
    console.error("Connection error", err);
    process.exit();
  });

app.post("/api/signup", SessionController.signup);
app.post("/api/signin", SessionController.signin);

app.listen(process.env.PORT || 3000);
