const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");

let userModel = require("../models/user");

const server = express.Router();

server.route("/register").put((req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        let err = new Error
        next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            console.log(req.body);
            if(err) next(err);
            else 
                userModel.create({
                    username: req.body.username,
                    password: hash
                }, (err,doc) => {
                    if (err) next(err);
                    else {
                        //console.log(doc);
                        res.json(doc);
                    }
                })
            })
    })
});

server.route("/login").post((req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login'
    })(req,res,next);
});

server.route("/").get((req,res,next)=>{
    userModel.find({}, (err,doc)=>{
        if(err) next(err);
        else res.json(doc);
    })
})
module.exports = server;
//bcrypt.compare(req.body.pass)