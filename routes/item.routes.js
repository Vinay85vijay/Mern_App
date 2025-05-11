const express = require('express');
const router = express.Router();
const {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/item.controller');

const validateItem = require('../middlewares/itemValidator');
const authMiddleware = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize');
const upload = require('../middlewares/upload.middleware');
const { itemRateLimiter } = require('../middlewares/rateLimiter');
router.use(itemRateLimiter);

// Only 'admin' can create, update, delete; 'user' can only read
router.get('/:query', authMiddleware, authorize('admin', 'user'), getItem);
router.get('/', authMiddleware, authorize('admin', 'user'), getItems);
router.post(
    '/',
    authMiddleware,
    authorize('admin'),
    upload.single('image'), // handles single image upload
    ...validateItem,
    createItem
  );
router.put('/:id', authMiddleware, authorize('admin'), validateItem, updateItem);
router.delete('/:id', authMiddleware, authorize('admin'), deleteItem);

module.exports = router;
