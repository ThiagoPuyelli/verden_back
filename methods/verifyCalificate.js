module.exports = (type, user, objectRatingID) => {
    for(let i in user[type + "sRating"]){
        if(user[type + "sRating"][i][type + "ID"] + "" == objectRatingID + ""){
            return user[type + "sRating"][i];
        }
    } 
    return false;
}