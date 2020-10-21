const Course = require("../models/Course");

module.exports = {
    async saveSection(req, res){
        const { name, course } = req.body;
        const position = course.sections.length + 1;

        course.sections.push({
            name,
            position
        });

        await Course.findByIdAndUpdate(course._id, course, {new: true}, (err, course) => {
            if(err) return res.status(500).send("Error al agregar sección");

            if(!course) return res.status(404).send("Los datos de la sección no son válidos");

            if(course) return res.status(200).send(course);
        })
    },
    async updateSection(req, res){
        const { position, course, name } = req.body;

        for(let i of course.sections){
            if(i.position == position){
                course.sections[i.position - 1] = {
                    name,
                    position
                }
            }
        }

        await Course.findByIdAndUpdate(course._id, course, {new: true}, (err, course) => {
            if(err) return res.status(500).send("Error al modificar sección");

            if(!course) return res.status(404).send("Los datos de la sección no son válidos");

            if(course) return res.status(200).send(course);
        })
    },
    async deleteSection(req, res){
        const position = req.params.position;
        const { course } = req.body;

        for(let i of course.sections){
            if(i.position == position){
                course.sections.splice(i.position - 1, 1);
                var indice = i.position;
                for(let index = indice - 1; index < course.sections.length; index++){
                    course.sections[index].position = index + 1;
                }
                console.log(course);
            }
        }

        await Course.findByIdAndUpdate(course._id, course, {new: true}, (err, courseWithSectionDelete) => {
            if(err) return res.status(500).send("Error al eliminar sección");

            if(!courseWithSectionDelete) return res.status(404).send("Los datos de la sección no son válidos");

            if(courseWithSectionDelete) return res.status(200).send(courseWithSectionDelete);
        })
    },
    async getSections(req, res){
        const courseID = req.params.id;

        await Course.findById(courseID, (err, course) => {
            if(err) return res.status(500).send("Error al buscar el curso");

            if(!course) return res.status(404).send("Los datos del curso no son válidos");

            if(course) return res.status(200).send(course.sections);
        })
    },
    async getSection(req, res){
        const courseID = req.params.id;
        const position = req.params.position;

        await Course.findById(courseID, (err, course) => {
            if(err) return res.status(500).send("Error al buscar el curso");

            if(!course) return res.status(404).send("Los datos del curso no son válidos");

            if(course){
                for(let i in course.sections){
                    if(course.sections[i].position == position){
                        return res.status(200).send(course.sections[i]);
                    }
                }
            }
        })
    }
}