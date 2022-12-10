const express = require("express");
const { authenticate } = require("passport");
const router = express.Router();
const passport = require('passport');
const userController = require("../controllers/users_controller");

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/signin', userController.sign_in);
router.get('/signup', userController.sign_up);
router.get('/signout', userController.sign_out);

router.post('/create', userController.create);
// router.post('/create-session', userController.createSession);

// Use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/signin' },
), userController.createSession);

module.exports = router;