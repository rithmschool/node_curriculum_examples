const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
