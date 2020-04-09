const express = require("express");
const bcrypt = require("bcryptjs");

let userModel = require("../models/user");

const server = express.Router();

server.route("/register").put((req, res, next) => {
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
    userModel.findOne({username: req.body.username}, (err, doc) => {
        if (err) next(err);
        else
            // console.log(doc);
            bcrypt.compare(req.body.password, doc.password, (err,result)=>{
                if(err) next(err);
                if(result){
                    delete res.password
                    res.json({
                        status: "OK",
                        result
                    })
                }
            })
    })
})

server.route("/").get((req,res,next)=>{
    userModel.find({}, (err,doc)=>{
        if(err) next(err);
        else res.json(doc);
    })
})
module.exports = server;
//bcrypt.compare(req.body.pass)