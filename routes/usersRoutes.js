const router = require("express").Router();
const { crudUsers, authentication } = require("../controllers/index");
const { multer } = require("../middlewares/index");

router.post("/register", multer("images", "image/").single("image"),crudUsers.register);
router.post("/login", authentication.login);
router.put("/update/:id", multer("images", "image/").single("image"),crudUsers.changeUser);

module.exports = router;