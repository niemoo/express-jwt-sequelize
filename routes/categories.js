const express = require('express');
const categories = require('../controllers/categoryControllers');
const authMiddleware = require('../middleware/UserMiddleware');
const router = express.Router();

router.get('/', categories.getAllCategoriesData);
router.get('/:id', authMiddleware, categories.getDetailCategoriesData);
router.post('/add', categories.addCategoriesData);
router.put('/update', categories.updateCategoriesData);

module.exports = router;
