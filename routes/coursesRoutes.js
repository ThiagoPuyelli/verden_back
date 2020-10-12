const router = require("express").Router();
const { crudCourses } = require("../controllers/index");
const { multer, verifyToken } = require("../middlewares/index");

router.post("/save", verifyToken, multer("images", "image/").single("image"), crudCourses.saveCourse);
router.get("/get", crudCourses.getCourses);
router.get("/get/:id", crudCourses.getCourse);
router.delete("/delete/:id", verifyToken, crudCourses.deleteCourse);
router.put("/update/:id", verifyToken, crudCourses.updateCourse);

module.exports = router