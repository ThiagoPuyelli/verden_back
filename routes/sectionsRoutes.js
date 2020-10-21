const router = require("express").Router();
const { verifyToken, findCourse } = require("../middlewares/index");
const { crudSections } = require("../controllers/index");

router.post("/save/:id", verifyToken, findCourse("id"), crudSections.saveSection);
router.put("/update/:id", verifyToken, findCourse("id"), crudSections.updateSection);
router.delete("/delete/:courseID/:position", verifyToken, findCourse("courseID"), crudSections.deleteSection);
router.get("/section/:id", verifyToken, crudSections.getSections);
router.get("/section/:id/:position", verifyToken, crudSections.getSection)

module.exports = router;