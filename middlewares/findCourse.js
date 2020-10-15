const Course = require("../models/Course");

module.exports = (param) => {
    return async (req, res, next) => {
        const courseID = req.params[param];

        const course = await Course.findById(courseID);

        if(course.instructor == req.headers['x-access-token'].split("|")[1]){
            req.body.course = course;
            next(null, true);
        } else {
            return res.status(403).send("El curso no es tuyo");
        }
    }
}