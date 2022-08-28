const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

type DB = {
  mongoose?: any;
  user?: any;
};

const db: DB = {};

db.mongoose = mongoose;

db.user = require("./User");

module.exports = db;
