const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email });

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            })
        }

        return res.json(200, {
            message: "Sign In successful. Here is your token please keep it safe !",
            data: {
                token: jwt.sign(user.toJSON(), 'Codieal-secret', {expiresIn:'10000'})
            }
        })
    } catch (error) {
        console.log(`Error while creating jsonwebtoken : ${error}`);
        return res.json(500, {
            message: "Internal server error"
        });
    }

    // Handle the data given by sign in form
    return res.redirect('/');
}