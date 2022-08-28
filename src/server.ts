import express from "express";
import SessionController from "./app/controllers/SessionController";
import cors from "cors";
import bodyParser from "body-parser";

const dbConnect = require("./app/models");
const dbConfig = require("./config/db.config");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

dbConnect.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err: unknown) => {
    console.error("Connection error", err);
    process.exit();
  });

app.post("/api/signup", SessionController.signup);

app.listen(process.env.PORT || 3000);
