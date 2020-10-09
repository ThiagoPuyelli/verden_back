const Course = require("../models/Course");

module.exports = {
    async saveCourse(req, res){
        const { name, category, difficulty, description, hours, instructorID } = req.body;

        const newCourse = new Course({ name, category, difficulty, description, hours, instructorID });

        await newCourse.save((err, course) => {
            if(err) return res.status(500).send("Error al guardar curso");

            if(!course) return res.status(404).send("El curso no tiene todos los datos válidos");

            if(course) return res.status(200).send(course);
        })
    },
    async updateCourse(req, res){
        courseID = req.params.id;

        Course.findByIdAndUpdate(courseID, req.body, {new: true}, (err, course) => {
            if(err) return res.status(500).send("Error al modificar curso");

            if(!course) return res.status(404).send("El curso no tiene todos los datos válidos");

            if(course) return res.status(200).send(course);
        })
    },
    async deleteCourse(req, res){
        courseID = req.params.id;

        await Course.findByIdAndRemove(courseID, (err, course) => {
            if(err) return res.status(500).send("Error al eliminar curso");

            if(!course) return res.status(404).send("La id no es válida");

            if(course) return res.status(200).send("Curso eliminado con éxito");
        })
    },
    async getCourse(req, res){
        courseID = req.params.id;
        
        await Course.findById(courseID, (err, course) => {
            if(err) return res.status(500).send("Error al buscar curso");

            if(!course) return res.status(404).send("La id no es válida");

            if(course) return res.status(200).send(course);
        })
    },
    async getCourses(req, res){
        await Course.find((err, course) => {
            if(err) return res.status(500).send("Error al buscar cursos");

            if(!course) return res.status(404).send("No se encuentran cursos");

            if(course) return res.status(200).send(course);
        })
    }
}