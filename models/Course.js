const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String, required: true},
    image: String,
    sections: {type: [{
        name: {type: String, required: true},
        position: {type: Number, required: true},
        videos: [{
            file: {type: String, required: true},
            name: {type: String, required: true}
        }],
        books: [{
            file: {type: String, required: true},
            name: {type: String, required: true}
        }]
    }], required: true},
    category: {type: String, required: true},
    difficulty: {type: String, required: true},
    rating: {type: Number, default: 0, min: 0, max: 5},
    description: {type: String, required: true},
    hours: {type: Number, required: true},
    instructor: {type: Schema.ObjectId, ref:"User", required: true}
})

module.exports = mongoose.model("Course", courseSchema);