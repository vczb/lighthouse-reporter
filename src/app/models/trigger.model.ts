import mongoose from "mongoose";

const { Schema } = mongoose;

const Trigger = mongoose.model(
  "Trigger",
  new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      unique: true,
    },
    pages: {
      type: [String],
      required: true,
    },
  }, {
    toJSON: {
      transform: function (_, ret) {
        delete ret.__v;
        delete ret._id;
      }
    }
  })
);

module.exports = Trigger;
