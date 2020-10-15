const router = require("express").Router();
const { verifyToken, findCourse } = require("../middlewares/index");
const { crudSections } = require("../controllers/index");

router.post("/save/:id", verifyToken, findCourse("id"), crudSections.saveSection);
router.put("/update/:id", verifyToken, findCourse("id"), crudSections.updateSection);
router.delete("/delete/:courseID/:position", verifyToken, findCourse("courseID"), crudSections.deleteSection);

module.exports = router;