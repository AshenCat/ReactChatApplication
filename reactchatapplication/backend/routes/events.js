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

/*Delete all entries
server.route("/delete-all").delete((req, res) => {
  eventHistoryModel.deleteMany({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  })
})*/


module.exports = server;
