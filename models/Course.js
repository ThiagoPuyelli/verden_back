const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String, required: true},
    image: String,
    sections: {type: [{
        name: String,
        position: Number,
        videos: [{
            file: String,
            name: String
        }],
        books: [{
            file: String,
            name: String
        }]
    }], required: true},
    category: {type: String, required: true},
    difficulty: {type: String, required: true},
    rating: {type: Number, default: 0, min: 0, max: 5},
    description: {type: String, required: true},
    hours: {type: Number, required: true},
    instructorID: {type: String, required: true}
})

module.exports = mongoose.model("Course", courseSchema);