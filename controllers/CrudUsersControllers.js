const User = require("../models/User")
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    async register(req, res){

        console.log(req.file);

        const userFind = await User.findOne({email: req.body.email});

        if(userFind){
            return res.status(200).send("Ese email ya está en uso");
        }

        const user = new User({...req.body});
        
        user.password = user.encryptPassword(req.body.password);

        if(req.file){
            user.image = req.file.filename
        }
        
        if(user){
            await user.save((err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al registrar el usuario");
                
                if(!user) return res.status(404).send("Los datos no son correctos");

                if(user){
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

        const userFind = await User.findById(userID);
        if(userFind.comparePassword(password, userFind.password)){
            return res.status(402).send("La contraseña que estas ")
        }
        const userChange = {
            email,
            name,
            username,
            password: userFind.encryptPassword(password)
        }

        if(!req.body && req.file){
            await User.findByIdAndUpdate(userID, {image: req.file.filename}, {new: true}, (err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al modificar el usuario");
                    
                if(!user) return res.status(404).send("Los datos no son correctos");
    
                if(user) return res.status(200).send(user);
            });
        }

        if(req.body && !req.file){
            await User.findByIdAndUpdate(userID, userChange, {new: true}, (err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al modificar el usuario");
                    
                if(!user) return res.status(404).send("Los datos no son correctos");
    
                if(user) return res.status(200).send(user);
            });
        }
        
        await User.findByIdAndUpdate(userID, {userChange, image: req.file.filename}, {new: true}, (err, user) => {
            if(err) return res.status(500).send("Ha ocurrido un error al modificar el usuario");
                
            if(!user) return res.status(404).send("Los datos no son correctos");

            if(user) return res.status(200).send(user);
        });
    }
}