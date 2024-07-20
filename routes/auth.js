const express = require('express');
const {signup, login} = require('../controllers/authController');
const router = express.Router();

// define routes
router.post('/signup', signup); // This route handles POST requests to /signup and calls the signup function
router.post('/login', login); // This route handles POST requests to /login and calls the login function

module.exports = router; //exporting router
