const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJwT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'Codieal-secret'
}

passport.use(new JWTStrategy(opts, (jwtPayLoad, done)=>{
    User.findById(jwtPayLoad._id, (err, user)=>{
        if(err){
            console.log(`Error occured will validating user for in passport-jwt : ${err}`);
            return;
        }
        
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
    next();
}));

module.exports = passport;