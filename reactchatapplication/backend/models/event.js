const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Event = new Schema(
  {
    type: {
      type: String,
      enum: ["CONNECTION", "JOINED", "ERROR", "DISCONNECT"],
      required: true,
    },
    user: {
      type: String,
    },
    PPID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", Event);
