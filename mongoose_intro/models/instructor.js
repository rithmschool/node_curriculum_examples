var mongoose = require("mongoose");

var instructorSchema = new mongoose.Schema({
    name: String
})

var Instructor = mongoose.model('Instructor', instructorSchema)

module.exports = Instructor