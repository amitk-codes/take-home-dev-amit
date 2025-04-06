const router = require('express').Router();
const ProductController = require('../../controllers/ProductController');

router.get('/', ProductController.getProducts);
router.get('/search', ProductController.searchProducts);
router.get('/:id', ProductController.getProduct);

module.exports = router;
