const express = require("express");
const router = express.Router();
const postController = require('../controllers/posts_controller');

router.get('/userposts', postController.userposts);

module.exports = router;