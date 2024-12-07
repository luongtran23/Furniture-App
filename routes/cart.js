const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add_to_cart', cartController.addToCart);
router.get('/view_cart/:userId', cartController.viewCart);
router.post('/remove_from_cart', cartController.removeFromCart);
router.get('/calculate_total_amount/:userId', cartController.calculateTotalAmount);
module.exports = router;
