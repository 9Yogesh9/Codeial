const express = require("express");
const router = express.Router();
const postController = require('../controllers/posts_controller');

router.post('/createposts', postController.create_post);

module.exports = router;