const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    courses: {type: [Schema.ObjectId], ref:"Course", default: []},
    email: {type: String, required: true},
    image: {type: String},
    rating: {type: Number, default: 0, min: 0, max: 5},
    calificates: {type: [Number], default: []},
    coursesRating: {type: [{
        rating: {type: Number, required: true},
        courseID: {type: Schema.ObjectId, ref: "Course", required: true}
    }], default: []},
    usersRating: {type: [{
        rating: {type: Number, required: true},
        userID: {type: Schema.ObjectId, ref: "User", required: true}
    }], default: []}
});

module.exports = mongoose.model("User", userSchema);