const router = require("express").Router();
const { crudCourses, filterCourses, rating } = require("../controllers/index");
const { multer, verifyToken } = require("../middlewares/index");

router.post("/save", verifyToken, multer("images", "image/").single("image"), crudCourses.saveCourse);
router.get("/get", crudCourses.getCourses);
router.get("/get/:id", crudCourses.getCourse);
router.delete("/delete/:id", verifyToken, crudCourses.deleteCourse);
router.put("/update/:id", verifyToken, crudCourses.updateCourse);
router.get("/:category", filterCourses.coursesCategory);
router.post("/courses-user", verifyToken, filterCourses.userCourses);
router.post("/rating/:id", verifyToken, rating.calificateCourse)

module.exports = router