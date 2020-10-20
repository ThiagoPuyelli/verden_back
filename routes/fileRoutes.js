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

router.put("/update-video/:courseID/:sectionPosition/:filePosition",
            verifyToken,
            multer("videos", "video/").single("video"),
            findCourse("courseID"),
            submitFiles("videos").updateFile);

router.put("/update-book/:courseID/:sectionPosition/:filePosition",
            verifyToken,
            multer("books", "application/").single("book"),
            findCourse("courseID"),
            submitFiles("books").updateFile);

router.delete("/delete-video/:courseID/:sectionPosition/:filePosition",
            verifyToken,
            findCourse("courseID"),
            submitFiles("videos").deletedFile);

router.delete("/delete-book/:courseID/:sectionPosition/:filePosition",
            verifyToken,
            findCourse("courseID"),
            submitFiles("books").deletedFile);

            router.delete("/delete-video/:courseID/:sectionPosition/:filePosition",
            verifyToken,
            findCourse("courseID"),
            submitFiles("videos").deletedFile);

router.get("/get-book/:courseID/:sectionPosition/:filePosition",
            verifyToken,
            submitFiles("books").getFile);

router.get("/get-video/:courseID/:sectionPosition/:filePosition",
            verifyToken,
            submitFiles("videos").getFile);

router.get("/get-book/:courseID/:sectionPosition",
            verifyToken,
            submitFiles("books").getFiles);
router.get("/get-video/:courseID/:sectionPosition",
            verifyToken,
            submitFiles("videos").getFiles);
module.exports = router;