const router = require("express").Router();
const productController = require("../controllers/productsControllers")

router.get('/search/:key',productController.searchProduct)
router.get('/',productController.getAllProduct)
router.get('/:id',productController.getProduct)
router.post('/',productController.createProduct)

module.exports = router;


