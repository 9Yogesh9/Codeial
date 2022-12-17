const User = require("../models/user");

module.exports.profile = function (req, res) {
    // res.end("User Profile");

    User.findById(req.params.id, (err,user)=>{
        if(err){console.log(`Check users_controller : ${err}`); return;}

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
module.exports.update = (req,res) =>{
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, (err,user)=>{
            if(err){console.log(`Error in updating the user database : ${err}`); return;}
            return res.redirect('back');
        })
    }else{
        return res.status(401).send("Unauthorized") ;
    }
}

// Sign in and create a session for user
module.exports.createSession = (req, res) => {
    req.flash('success', "Logged in successfully");
    
    // Handle the data given by sign in form
    return res.redirect('/');
}