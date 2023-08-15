/* eslint-disable no-console */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const connectDB = async () => {

  const uri = isProd ? process.env.DB_URL : process.env.DB_URL_DEV 

  mongoose
    .connect(uri || '')
    .then(() => {
      console.log(
        `Successfully connect to ${
          isProd ? "production" : "development"
        } MongoDB.`
      );
    })
    .catch((err: Error) => {
      console.error("Connection error", err);
      process.exit();
    });
};

export { connectDB };
