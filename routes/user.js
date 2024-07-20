const express = require('express');
const { getUserData, borrowMoney } = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

// The authMiddleware is used to ensure that only authenticated users can access this route
router.get('/', authMiddleware, getUserData); // Define the route for getting user data
router.post('/borrow', authMiddleware, borrowMoney); // Define the route for borrowing money

module.exports = router; //Exporting router
