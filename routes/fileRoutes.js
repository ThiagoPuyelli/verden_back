const router = require("express").Router();
const { verifyToken, multer, findCourse } = require("../middlewares/index");
const { submitFiles } = require("../controllers/index");

router.post("/append-video/:courseID/:sectionPosition", 
            verifyToken,
            multer("videos", "video/").single("video"),
            findCourse("courseID"), 
            submitFiles("videos").appendFile);

router.post("/append-book/:courseID/:sectionPosition", 
            verifyToken,
            multer("books", "application/").single("book"),
            findCourse("courseID"), 
            submitFiles("books").appendFile);

router.put("/update-video/:courseID/:sectionPosition",
            verifyToken,
            multer("videos", "video/").single("video"),
            findCourse("courseID"),
            submitFiles("videos").updateFile);

router.put("/update-book/:courseID/:sectionPosition",
            verifyToken,
            multer("books", "application/").single("book"),
            findCourse("courseID"),
            submitFiles("books").updateFile);

module.exports = router;