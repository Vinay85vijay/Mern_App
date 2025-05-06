const express = require('express');
const router = express.Router();
const { getItem, getItems, createItem, updateItem, deleteItem } = require('../controllers/item.controller');
const validateItem = require('../middlewares/itemValidator');
// Protect the route
const authMiddleware = require('../middlewares/auth.middleware'); 

router.get('/:query', authMiddleware, getItem); 
router.get('/', authMiddleware, getItems); 
router.post('/', authMiddleware, ...validateItem, createItem); 
router.put('/:id', authMiddleware, validateItem, updateItem); 
router.delete('/:id', authMiddleware, deleteItem); 

module.exports = router;
