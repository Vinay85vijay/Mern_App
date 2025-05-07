const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { authRateLimiter } = require('../middlewares/rateLimiter');

router.post('/register',authRateLimiter, register);
router.post('/login',authRateLimiter, login);

module.exports = router;
