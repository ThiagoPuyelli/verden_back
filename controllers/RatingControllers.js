const Course = require("../models/Course");
const User = require("../models/User");
const { calificate, verifyCalificate } = require("../methods/index");

module.exports = {
    async calificateCourse(req, res){
        const { user, course, rating } = req.body;

        const value = await calificate("course", course, rating, user);
        
        await Course.findByIdAndUpdate(value._id, value, {new: true}, async (err, courseUpdate) => {

            if(err) return res.status(500).send("Ha ocurrido un error al calificar el curso");

            if(!courseUpdate) return res.status(404).send("Los datos de la calificación no son correctos");

            if(courseUpdate){
                user.coursesRating.push({
                    courseID: courseUpdate._id,
                    rating
                });

                await User.findByIdAndUpdate(user._id, user, {new: true}, (err, userUpdate) => {
                    if(err) return res.status(500).send("Ha ocurrido un error al agregar el curso a la lista de calificados");

                    if(!userUpdate) return res.status(404).send("El dato del curso calificado no es válido");
                    
                    if(userUpdate) return res.status(200).send(courseUpdate); 
                })
            }
        })
    },
    async calificateUser(req, res){
        const { user, userRating, rating } = req.body;

        const value = await calificate("user", userRating, rating, user);

        await User.findByIdAndUpdate(value._id, value, {new: true}, async (err, userUpdate) => {
            if(err) return res.status(500).send("Ha ocurrido un error al calificar el usuario");

            if(!userUpdate) return res.status(404).send("Los datos de la calificación no son correctos");

            if(userUpdate){
                user.usersRating.push({
                    userID: userUpdate._id,
                    rating
                });

                await User.findByIdAndUpdate(user._id, user, {new: true}, (err, userUpdate) => {
                    if(err) return res.status(500).send("Ha ocurrido un error al agregar el usuario a la lista de calificados");

                    if(!userUpdate) return res.status(404).send("El dato del usuario calificado no es válido");
                    
                    if(userUpdate) return res.status(200).send(userUpdate); 
                })
            }
        })
    }, 
    async verifyCalificateCourse(req, res){
        const user = await User.findById(req.headers['x-access-token'].split("|")[1]);

        const verify = await verifyCalificate("course", user, req.params.id);

        return res.json({
            verify
        });
    },
    async verifyCalificateUser(req, res){
        const user = await User.findById(req.headers['x-access-token'].split("|")[1]);

        const verify = await verifyCalificate("user", user, req.params.id);

        return res.json({
            verify
        });
    }
}