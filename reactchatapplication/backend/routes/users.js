const express = require("express");
const bcrypt = require("bcryptjs");
const server = express.Router();

server.route("/users").get((req, res, next) => {});

module.exports = server;
