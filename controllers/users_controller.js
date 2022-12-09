module.exports.profile = function (req, res) {
    // res.end("User Profile");
    return res.render('profile', {
        title: "User | Profile",
    })
}