const rateLimit = require('express-rate-limit');

const authRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per IP
  message: 'Too many attempts, please try again later.',
});

const itemRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Max 100 requests per IP
  message: 'Rate limit exceeded. Please try later.',
});

module.exports = {
  authRateLimiter,
  itemRateLimiter,
};
