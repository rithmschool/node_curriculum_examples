var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    task: String,
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor"
    }
})

var Todo = mongoose.model('todo', todoSchema)

module.exports = Todo