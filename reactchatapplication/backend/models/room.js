const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Room = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Inactive", "Active"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("room", Room);
