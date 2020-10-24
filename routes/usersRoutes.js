const router = require("express").Router();
const { crudUsers, authentication, rating } = require("../controllers/index");
const { multer, verifyToken } = require("../middlewares/index");

router.post("/register", multer("images", "image/").single("image"),crudUsers.register);
router.post("/login", authentication.login);
router.put("/update/:id", verifyToken, multer("images", "image/").single("image"),crudUsers.changeUser);
router.delete("/delete/:id", verifyToken, crudUsers.deleteUser);
router.get("/user/:id", crudUsers.getUser);
router.get("/user", crudUsers.getUsers);
router.post("/rating/:id", verifyToken, rating.calificateUser);

module.exports = router;