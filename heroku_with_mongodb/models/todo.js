var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    task: String,
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor"
    }
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo