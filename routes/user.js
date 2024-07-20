const express = require('express');
const { getUserData, borrowMoney } = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getUserData);
router.post('/borrow', authMiddleware, borrowMoney);

module.exports = router;
