const express = require("express");
const server = express.Router();

let chatHistoryModel = require("../models/chat");

server.route("/").get((req, res, next) => {
  let notInc = {
    __v: false,
    updatedAt: false,
  };
  chatHistoryModel.find({}, notInc, (err, doc) => {
    if (err) next(err);
    res.json(doc);
  });
});

module.exports = server;
