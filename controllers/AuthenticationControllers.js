const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
    async login(req, res){
        const { email, password } = req.body;
        const user = await User.findOne({email: email});

        if(user && user.comparePassword(password, user.password)){
            const token = jwt.sign({id: user._id}, process.env.JWT_PASSWORD, {
                expiresIn: 24 * 24 * 60
            });

            return res.status(200).json({
                auth: true,
                token: token + "|" + user._id
            });
        } else if(!user){
            return res.status(404).send("El email no es válido");
        } else {
            return res.status(404).send("La contraseña no es válida");
        }
    }
}