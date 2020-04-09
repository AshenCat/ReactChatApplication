const express = require("express");
const server = express.Router();

let eventHistoryModel = require("../models/event");

server.route("/").get((req, res, next) => {
  let notInc = {
    __v: false,
    updatedAt: false,
  };
  eventHistoryModel.find({}, notInc, (err, doc) => {
    if (err) next(err);
    res.json(doc);
  });
});

server.route("/deleteeverything").get((req, res, next) => {
  eventHistoryModel.remove({}, (err) => {
    if (err) next(err);
    else res.end("Success");
  });
});

module.exports = server;
