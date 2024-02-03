const express = require('express');
const categories = require('../controllers/categoryControllers');
const router = express.Router();

router.get('/', categories.getAllCategoriesData);
router.get('/:id', categories.getDetailCategoriesData);
router.post('/add', categories.addCategoriesData);
router.put('/update', categories.updateCategoriesData);

module.exports = router;
