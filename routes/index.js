// Default file for all routes
const express = require("express");
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
// Redirect the request to neighbor if url contains /users
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));


module.exports = router;