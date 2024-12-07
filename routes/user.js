const router = require("express").Router();
const userController = require("../controllers/userCotroller")

router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUser)

module.exports = router;
