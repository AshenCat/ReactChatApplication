const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Message = new Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    by: {
      type: String,
      required: true,
    },
    receivedby: {
      type: String,
      default: "All",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", Message);
