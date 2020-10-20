const Course = require("../models/Course");

module.exports = (typeFile) => {
    return {
        async appendFile(req, res){
            const { course, name, description } = req.body;
            const file = req.file.filename;
            const sectionPosition = req.params.sectionPosition;            
            
            const section = course.sections[sectionPosition - 1];
            const position = section[typeFile].length + 1;

            course.sections[sectionPosition -1][typeFile].push({
                name,
                description,
                file,
                position
            });

            await Course.findByIdAndUpdate(course._id, course, {new: true}, (err, courseUpdated) => {
                if(err) return res.status(500).send("Ah ocurrido un error al agregar el archivo");

                if(!courseUpdated) return res.status(404).send("La información no es válida");

                if(courseUpdated) return res.status(200).send(courseUpdated);
            })
        },
        async updateFile(req, res){
            const { course, sectionPosition } = req.body;
            if(req.file){
                const file = req.file.filename;
                course.sections[sectionPosition - 1][typeFile].file = file;
                await Course.findByIdAndUpdate(course._id, course, {new: true}, (err, courseUpdated) => {
                    if(err) return res.status(500).send("Ah ocurrido un error al agregar el archivo");
    
                    if(!courseUpdated) return res.status(404).send("La información no es válida");
    
                    if(courseUpdated) return res.status(200).send(courseUpdated);
                })
            } else {
                const { name, description } = req.body;
                course.sections[sectionPosition - 1][typeFile].name = name;
                course.sections[sectionPosition - 1][typeFile].description = description;

                await Course.findByIdAndUpdate(course._id, course, {new: true}, (err, courseUpdated) => {
                    if(err) return res.status(500).send("Ah ocurrido un error al agregar el archivo");
    
                    if(!courseUpdated) return res.status(404).send("La información no es válida");
    
                    if(courseUpdated) return res.status(200).send(courseUpdated);
                })
            }
        }
    }
} 