/* eslint-disable no-console */
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err: Error) => {
      console.error("Connection error", err);
      process.exit();
    });
};

module.exports = { connectDB };
