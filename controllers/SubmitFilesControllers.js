const Course = require("../models/Course");
const { deleteFile } = require("../methods/index");

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
            const { course } = req.body;
            const { sectionPosition, filePosition } = req.params;
            if(req.file){
                
                const file = req.file.filename;
                deleteFile(typeFile, course.sections[sectionPosition - 1][typeFile][filePosition - 1].file);
                course.sections[sectionPosition - 1][typeFile][filePosition - 1].file = file;

            } else {
                const { name, description } = req.body;
                if(!name || !description){
                    return res.status(404).send("Los datos para cambiar no son válidos");
                }
                course.sections[sectionPosition - 1][typeFile][filePosition - 1].name = name;
                course.sections[sectionPosition - 1][typeFile][filePosition - 1].description = description;
            }
            await Course.findByIdAndUpdate(course._id, course, {new: true}, (err, courseUpdated) => {
                if(err) return res.status(500).send("Ah ocurrido un error al agregar el archivo");

                if(!courseUpdated) return res.status(404).send("La información no es válida");

                if(courseUpdated) return res.status(200).send(courseUpdated);
            })
        },
        async deletedFile(req, res){
            const { course } = req.body;
            const { sectionPosition, filePosition } = req.params;
            
            deleteFile(typeFile, course.sections[sectionPosition - 1][typeFile][filePosition - 1].file);
            course.sections[sectionPosition - 1][typeFile].splice(filePosition - 1, 1);
            for(let i = filePosition - 1; i < course.sections[sectionPosition - 1][typeFile].length; i++){
                course.sections[sectionPosition - 1][typeFile][i].position = i + 1;
            }

            await Course.findByIdAndUpdate(course._id, course, {new: true}, (err, courseUpdated) => {
                if(err) return res.status(500).send("Ah ocurrido un error al eliminar el archivo");

                if(!courseUpdated) return res.status(404).send("La información no es válida");

                if(courseUpdated) return res.status(200).send(courseUpdated);
            })
        },
        async getFiles(req, res){
            const { courseID, sectionPosition } = req.params;

            await Course.findById(courseID, (err, course) => {
                if(err) return res.status(500).send("Ah ocurrido un error al buscar el contenido");

                if(!course) return res.status(404).send("La información no es válida");

                if(course) return res.status(200).send(course.sections[sectionPosition - 1][typeFile]);
            })
        },
        async getFile(req, res){
            const { courseID, sectionPosition, filePosition } = req.params;

            await Course.findById(courseID, (err, course) => {
                if(err) return res.status(500).send("Ah ocurrido un error al buscar el contenido");

                if(!course) return res.status(404).send("La información no es válida");

                if(course) return res.status(200).send(course.sections[sectionPosition - 1][typeFile][filePosition - 1]);
            })
        }
    }
} 