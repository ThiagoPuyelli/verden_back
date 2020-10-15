const Course = require("../models/Course");

module.exports = {
    async saveSection(req, res){
        const { name, course } = req.body;

        if(course.instructor != req.headers["x-access-token"].split("|")[1]){
            return res.status(403).send("No eres el dueño del curso");
        };

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
                course.sections.splice(i, 1);
                for(let index = i; index <= course.sections.length; index++){
                    course.sections[index].position = index;
                }
            }
        }

        console.log(course);
    }
}