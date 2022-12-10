const User = require("../models/user");

module.exports.profile = function (req, res) {
    // res.end("User Profile");
    return res.render('profile', {
        title: "User | Profile",
    })
};

module.exports.sign_in = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signin', {
        title: "Sign In",
    })
};

module.exports.sign_up = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signup', {
        title: "Sign Up",
    })
};

// Get the sign up data
module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password)
        return res.redirect('back');
    
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log(`Error in signing up the User ${err}`); return; }

        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) { console.log(`Error in creating User while signing up ${err}`); return; }

                return res.redirect('/users/signin');
            })
        }else{
            res.redirect('back');
        }
    })
}

// Sign in and create a session for user
module.exports.createSession = (req, res) => {
    // Handle the data given by sign in form
    return res.redirect('/');
}