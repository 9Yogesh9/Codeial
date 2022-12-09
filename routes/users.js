const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get('/profile', userController.profile);
router.get('/signin', userController.sign_in);
router.get('/signup', userController.sign_up);

module.exports = router;