const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  task: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  }
});

module.exports = mongoose.model('Todo', todoSchema);
