import mongoose from "mongoose";

const { Schema } = mongoose;

const Report = mongoose.model(
  "Report",
  new mongoose.Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: String,
      data: [
        {
          url: String,
          accessibility: String,
          best: String,
          performance: String,
          pwa: String,
          seo: String,
        },
      ],
    },
    { 
      timestamps: true,
      toJSON: {
        transform: function (_, ret) {
          delete ret.__v;
          delete ret._id;
        }
      }
    }
  )
);

module.exports = Report;
