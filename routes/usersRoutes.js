const router = require("express").Router();
const { crudUsers, authentication } = require("../controllers/index");

router.post("/register", crudUsers.register);
router.post("/login", authentication.login);

module.exports = router;