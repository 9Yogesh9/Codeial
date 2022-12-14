const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//  Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function (req, email, password, done) {
        // Find a user and establish the identity
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                req.flash('error', err);
                // console.log(`Error while searching (passport) for user in database ${err}`);
                return done(err);
            }

            if (!user || user.password != password) {
                req.flash('error', `Invalid username/password`);
                // console.log(`Invalid username/password`);
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log(`Error in finding user while deserializing ${err}`);
            return;
        }

        return done(null, user);
    })
});

passport.checkAuthentication = function (req, res, next) {
    // If user is signed in pass on to next controller
    if (req.isAuthenticated()) {
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/signin');
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user is coming from the Users model, it contains the information of signed in user from the session cookie
        // and we are sending this into locals for views
        res.locals.user = req.user;
    }
    next();
};