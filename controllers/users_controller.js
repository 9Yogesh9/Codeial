const User = require("../models/user");
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    // res.end("User Profile");

    User.findById(req.params.id, (err, user) => {
        if (err) { console.log(`Check users_controller : ${err}`); return; }

        return res.render('profile', {
            title: "User | Profile",
            profile_user: user
        })
    })

};

module.exports.sign_in = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_signin', {
        title: "Sign In",
    })
};

module.exports.sign_up = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_signup', {
        title: "Sign Up",
    })
};

module.exports.sign_out = (req, res) => {
    // Function given by passport.js to kill the session
    req.logout((err) => {
        if (err) {
            console.log(`Error occured while logging out ${err}`);
            return;
        }

        req.flash('success', "Logged out successfully");

        return res.redirect('/');
    });
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
        } else {
            res.redirect('back');
        }
    })
}

// Update the data for user
module.exports.update = async (req, res) => {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, (err) => {
                if (err) {
                    console.log(`***Multer Error: ${err}`);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    let pathToCheck = path.join(__dirname + '..' + user.avatar);
                    // Checking if the file exists or not if exists then delete it
                    if(fs.existsSync(pathToCheck)){
                        fs.unlinkSync();
                    }
                    user.avatar = "";
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch (error) {
            req.flash('error', `Error in updating user data`);
            return res.redirect('back');
        }

    } else {
        return res.status(401).send("Unauthorized");
    }
}

// Sign in and create a session for user
module.exports.createSession = (req, res) => {
    req.flash('success', "Logged in successfully");

    // Handle the data given by sign in form
    return res.redirect('/');
}