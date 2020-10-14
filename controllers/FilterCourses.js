const Course = require("../models/Course");
const User = require("../models/User");

module.exports = {
    async coursesCategory(req, res){
        const category = req.params.category;

        await Course.find({category}, (err, courses) => {
            if(err) return res.status(500).send("Error al buscar los cursos");

            if(!courses) return res.status(404).send("No se encuentran cursos con esa categoría");

            if(courses) return res.status(200).send(courses);
        })
    },
    async userCourses(req, res){
        const userID = req.headers["x-access-token"].split("|")[1];

        await User.findById(userID, async (err, user) => {
            if(err) return res.status(500).send("Error al buscar el usuario");

            if(!user) return res.status(404).send("No se encuentra el usuario");

            if(user){
                await Course.populate(user, {path: "courses"}, (err, user) => {
                    if(err) return res.status(500).send("Error al buscar los cursos");

                    if(!user) return res.status(404).send("No se encuentran cursos");

                    if(user) return res.status(200).send(user.courses);
                })
            }  
        })
    }
}