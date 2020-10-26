const User = require("../models/User");

module.exports = async ( type, objectRating, rating, user ) => {

    objectRating.calificates.push(rating);

    var suma = 0;

    if(objectRating.calificates.length > 0){
        for(let i in objectRating.calificates){
            suma += objectRating.calificates[i];
        }
    }

    objectRating.rating = (suma / objectRating.calificates.length).toFixed(1);
        const decimal = (objectRating.rating % 1).toFixed(1);
        const ratingRound = Math.round(objectRating.rating);

        if(objectRating.rating % 1 != 0){
            if(decimal == 0.2 || decimal == 0.3 || decimal == 0.8 || decimal == 0.9) objectRating.rating = ratingRound;

            if(decimal == 0.7 || decimal == 0.6) objectRating.rating = ratingRound - 0.5;
            
            if(decimal == 0.3 || decimal == 0.4) objectRating.rating = ratingRound + 0.5;
        }

    /*const userData = {
        rating,
        [type + "ID"]: objectRating._id
    };*/
    
    /*if(type == "course"){
        user.coursesRating.push(userData);
    }
    if (type == "user"){
        user.usersRating.push(userData);
    }

    const newUser = await User.findByIdAndUpdate(user._id, user, {new: true}, (err, userUpdate) => {
        if(err) return "Ha ocurrido un error al guardar que se califico el curso";

        if(!userUpdate) return "Los datos no son válidos";

        if(userUpdate) {
            return userUpdate
        }
    })
    
    if(newUser)*/
    return objectRating
}