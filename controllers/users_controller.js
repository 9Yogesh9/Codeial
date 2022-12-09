module.exports.profile = function (req, res) {
    // res.end("User Profile");
    return res.render('profile', {
        title: "User | Profile",
    })
};

module.exports.sign_in = function(req,res){
    return res.render('user_signin',{
        title: "Sign In",
    })
};

module.exports.sign_up = (req,res) =>{
    return res.render('user_signup',{
        title: "Sing Up",
    })
};