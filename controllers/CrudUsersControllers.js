const User = require("../models/User")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { deleteFile, encryptPassword } = require("../methods/index");

module.exports = {
    async register(req, res){
        
        // Verificación que no exista el email

        const userFind = await User.findOne({email: req.body.email});

        if(userFind){
            return res.status(200).send("Ese email ya está en uso");
        }

        //Creación de usuario

        const user = await new User({...req.body});
        
        user.password = encryptPassword(req.body.password);

        // Gurdado del nombre de la imagen

        if(req.file){
            user.image = req.file.filename
        }
        
        if(user){
            // Guardado de usuario
            await user.save((err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al registrar el usuario");
                
                if(!user) return res.status(404).send("Los datos no son correctos");

                if(user){

                    //Generación de token

                    const token = jwt.sign({id: user._id}, process.env.JWT_PASSWORD, {
                        expiresIn: 24 * 24 * 60
                    });

                    return res.status(200).json({
                        auth: true,
                        token: token + "|" + user._id
                    });
                }
            })
        }
    },
    async changeUser(req, res){
        const userID = req.params.id;

        const { email, name, username, password } = req.body;

        // Recopilacion de datos para modificar

        const userChange = {
            email,
            name,
            username,
            password: encryptPassword(password)
        }

        // Si es que tan solo cambia datos como un email o username

        if(req.body && !req.file){
            await User.findByIdAndUpdate(userID, userChange, {new: true}, (err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al modificar el usuario");
                    
                if(!user) return res.status(404).send("Los datos no son correctos");
    
                if(user) return res.status(200).send(user);
            });
        }

        // Si es que cambia tan solo la imagen

        if(!req.body && req.file){
            await User.findByIdAndUpdate(userID, {image: req.file.filename}, {new: true}, (err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al modificar el usuario");
                    
                if(!user) return res.status(404).send("Los datos no son correctos");
    
                if(user) return res.status(200).send(user);
            });
        }

        // Si es que cambia ambos
        
        await User.findByIdAndUpdate(userID, {...userChange, image: req.file.filename}, {new: true}, (err, user) => {
            if(err) return res.status(500).send("Ha ocurrido un error al modificar el usuario");
                
            if(!user) return res.status(404).send("Los datos no son correctos");

            if(user) return res.status(200).send(user);
        });
    },
    async deleteUser(req, res){
        const userID = req.params.id;

        await User.findByIdAndRemove(userID, async (err, user) => {
            if(err) return res.status(500).send("Ha ocurrido un error al eliminar el usuario");
                
            if(!user) return res.status(404).send("Los datos no son correctos");

            if(user){
                if(user.image){
                    deleteFile("images", user.image);
                }

                return res.status(200).send("Usuario eliminado con éxito")
            }
        })
    },
    async getUser(req, res){
        const userID = req.params.id;

        await User.findById(userID, (err, user) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar el usuario");
                
            if(!user) return res.status(404).send("Los datos no son correctos o no se encuentra mas ese usuario");

            if(user) return res.status(200).send(user);
        })
    },
    async getUsers(req, res){
        await User.find((err, user) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar el usuario");
                
            if(!user) return res.status(404).send("No se encuentran usuarios registrados");

            if(user) return res.status(200).send(user);
        })
    }
}