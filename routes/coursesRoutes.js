const router = require("express").Router();
const { crudCourses } = require("../controllers/index");

router.post("/save", crudCourses.saveCourse);
router.get("/get", crudCourses.getCourses);
router.get("/get/:id", crudCourses.getCourse);
router.delete("/delete/:id", crudCourses.deleteCourse);
router.put("/update/:id", crudCourses.updateCourse);

module.exports = router