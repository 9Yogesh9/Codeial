// Default file for all routes
const express = require("express");
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);


module.exports = router;