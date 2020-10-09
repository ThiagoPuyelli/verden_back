const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    courses: {type: [Schema.ObjectId], ref:"Course", default: []},
    email: {type: String, required: true},
    image: {type: String}
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = (password, realPassword) => {
    return bcrypt.compareSync(password, realPassword);
}

module.exports = mongoose.model("User", userSchema);