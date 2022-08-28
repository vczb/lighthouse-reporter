import { User } from "../types";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

type DB = {
  mongoose?: any;
  user?: User;
};

const db: DB = {};

db.mongoose = mongoose;

db.user = require("./user.model");

module.exports = db;
