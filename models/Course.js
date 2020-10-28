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
            name: {type: String, required: true},
            description: { type: String, required: true},
            position: { type: Number, required: true}
        }],
        books: [{
            file: {type: String, required: true},
            name: {type: String, required: true},
            description: { type: String, required: true},
            position: { type: Number, required: true}
        }]
    }], required: true},
    category: {type: String, required: true},
    difficulty: {type: String, required: true},
    rating: {type: Number, default: 0, min: 0, max: 5},
    calificates: {type: [Number], min: 0, max: 10, default: []},
    description: {type: String, required: true},
    hours: {type: Number, default: 0},
    instructor: {type: Schema.ObjectId, ref:"User", required: true},
    alumns: {type: [Schema.ObjectId], ref: "User", default: []}
})

module.exports = mongoose.model("Course", courseSchema);