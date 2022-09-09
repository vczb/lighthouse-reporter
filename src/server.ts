require("dotenv").config();
import express from "express";
import routes from "./routes"
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

app.use('/api', routes)



app.listen(process.env.PORT || 3000);
