require("dotenv").config();
import express from "express";
import routes from "./routes"
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

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

//Set rate limit to requests coming from same API.
const limiter = rateLimit({
  max: 100,
  //An API can make maximum 100 requests in a hour 
  windowMs: 60 * 60 * 100,
  message: "Too many requests from this IP. Please try again later!"
})

app.use(cors(corsOptions));

connectDB();

app.use('/api', routes)



app.listen(process.env.PORT || 3000);
