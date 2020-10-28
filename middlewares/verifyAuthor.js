const User = require("../models/User");
const Course = require("../models/Course");
const verifyCalificate = require("../methods/verifyCalificate");

module.exports = (type, paramID) => {
    return async (req, res, next) => {
        const user = await User.findById(req.headers['x-access-token'].split("|")[1]);
        
        if(type == "user"){
            const objectRating = await User.findById(req.params[paramID]);

            if(objectRating._id + "" == user._id + ""){
                return res.json({
                    error: "No puedes puntuar tu propio usuario"
                });
            }

            const verify = await verifyCalificate("user", user, objectRating._id);

            if(verify) return res.json({ error: "No puedes volver a puntuar el mismo usuario" });

            if(!verify){
                req.body.user = user;
                req.body.userRating = objectRating;
                
                next(null, true)
            }

        } else if (type == "course"){
            const objectRating = await Course.findById(req.params[paramID]);

            for(let i in user.courses){
                if(user.courses[i] + "" == objectRating._id + ""){
                    return res.json({
                        error: "No puedes puntuar tu propio curso"
                    });
                }
            }

            const verify = await verifyCalificate("course", user, objectRating._id);

            if(verify) return res.status(200).json({error: "No puedes volver a puntuar el mismo curso"});

            if(!verify) {
                req.body.course = objectRating;
                req.body.user = user;
    
                next(null, true)
            }

        } else {
            res.json({error: "Especifica el tipo de busqueda"});
        }
    }
}