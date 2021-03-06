const Course = require("../models/Course");
const { deleteFile } = require("../methods/index");
const User = require("../models/User");

module.exports = {
    async saveCourse(req, res){
        const instructor = req.headers["x-access-token"].split("|")[1];
        const image = req.file.filename

        const newCourse = new Course({...req.body, instructor, image});

        if(newCourse){
            await newCourse.save(async (err, course) => {
                if(err) return res.status(500).send("Error al guardar curso");
    
                if(!course) return res.status(404).send("El curso no tiene todos los datos válidos");
    
                if(course){
                    const user = await User.findById(instructor);
                    user.courses.push(course._id);
                    await User.findByIdAndUpdate(instructor, user, (err, userUpdate) => {
                        if(err) return res.status(500).send("Error al modificar usuario");

                        if(!userUpdate) return res.status(404).send("El id del usuario no es correcto");

                        if(userUpdate) return res.status(200).send(course);
                    });
                }
            })
        }
    },
    async updateCourse(req, res){
        courseID = req.params.id;

        // Si lo que se quiere cambiar es la imagen

        if(req.file){
            Course.findByIdAndUpdate(courseID, {image: req.file.filename}, (err, course) => {
                if(err) return res.status(500).send("Error al modificar curso");
    
                if(!course) return res.status(404).send("El curso no tiene todos los datos válidos");
    
                if(course){
                    deleteFile("images", course.image);
                    return res.status(200).send("Imagen modificada");
                }
            })
        }

        Course.findByIdAndUpdate(courseID, req.body, {new: true}, (err, course) => {
            if(err) return res.status(500).send("Error al modificar curso");

            if(!course) return res.status(404).send("El curso no tiene todos los datos válidos");

            if(course) return res.status(200).send(course);
        })
    },
    async deleteCourse(req, res){
        const courseID = req.params.id;
        const instructor = req.headers["x-access-token"].split("|")[1];
        const course = await Course.findById(courseID);

        // Verificación de dueños de usuario

        if(instructor == course.instructor){
            await Course.findByIdAndRemove(courseID, (err, course) => {
                if(err) return res.status(500).send("Error al eliminar curso");
    
                if(!course) return res.status(404).send("La id no es válida");
    
                if(course) {
                    deleteFile("images", course.image);
    
                    return res.status(200).send("Curso eliminado con éxito");
                }
            })
        } else {
            return res.status(403)
                        .json({
                            error: "Usted no está autorizado a eliminar este curso porque no es suyo"
                        });
        }
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