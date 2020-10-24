const Course = require("../models/Course");
const User = require("../models/User");
const { calificate } = require("../methods/index");

module.exports = {
    async calificateCourse(req, res){
        const course = await Course.findById(req.params.id);
        const user = await User.findById(req.headers["x-access-token"].split("|")[1]);

        const value = await calificate("course", course, req.body.rating, user);
        if(value === "Objeto ya calificado"){
            return res.json({
                error: "Curso ya calificado"
            });
        }
        if(value == "Este es tu objeto no lo puedes validar"){
            return res.json({
                error: value
            });
        }
        await Course.findByIdAndUpdate(value._id, value, {new: true}, (err, courseUpdate) => {

            if(err) return res.status(500).send("Ha ocurrido un error al calificar el curso");

            if(!courseUpdate) return res.status(404).send("Los datos de la calificación no son correctos");

            if(courseUpdate) return res.status(200).send(courseUpdate);
        })
    },
    async calificateUser(req, res){
        const userCalificate = await User.findById(req.params.id);
        const user = await User.findById(req.headers["x-access-token"].split("|")[1]);

        const value = await calificate("user", userCalificate, req.body.rating, user);

        if(value === "Objeto ya calificado"){
            return res.json({
                error: "Usuario ya calificado"
            });
        }
        if(value == "Este es tu objeto no lo puedes validar"){
            return res.json({
                error: "Este es tu usuario no lo puedes validar"
            });
        }
        await User.findByIdAndUpdate(value._id, value, {new: true}, (err, userUpdate) => {
            if(err) return res.status(500).send("Ha ocurrido un error al calificar el usuario");

            if(!userUpdate) return res.status(404).send("Los datos de la calificación no son correctos");

            if(userUpdate) return res.status(200).send(userUpdate);
        })
    }
}