const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = User;
