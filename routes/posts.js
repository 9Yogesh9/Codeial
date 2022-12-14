const express = require("express");
const passport = require("passport");
const router = express.Router();
const postController = require('../controllers/posts_controller');

router.post('/createposts', passport.checkAuthentication, postController.create_post);
router.get('/destroyposts/:id', passport.checkAuthentication, postController.destroy);

module.exports = router;