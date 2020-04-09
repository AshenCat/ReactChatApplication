const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField:'username'}, (username, password, done) => {
        // Match user
        userModel.findOne({username: username}, (err, doc) => {
            if (err) next(err);
            if (!doc) return done(null, false, {message : 'Could not authenticate user...'});
            else
                // console.log(doc);
                bcrypt.compare(password, doc.password, (err,result)=>{
                    if(err) next(err);
                    if(result){
                        delete doc.password
                        return done(null, doc);
                    }
                    else {
                        return done(null, false, {message : 'Could not authenticate user...'})
                    }
                })
        })
    }));
    passport.serializeUser((user,done) => { 
        done(null, user.id)
    });
    passport.deserializeUser((id,done)=> {
        userModel.findById(id,(err,user)=>{
            done(err,user);
        })
    })
};