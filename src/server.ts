require("dotenv").config();
import express from "express";
import routes from "./routes"
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

const { connectDB } = require("./database/mongodb");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set security headers
app.use(helmet())

//security against NoSQL Query Injection
app.use(mongoSanitize());

//Data sanitization against XSS attacks
app.use(xss());


app.use(cors(corsOptions));

connectDB();

app.use('/api', routes)



app.listen(process.env.PORT || 3000);
