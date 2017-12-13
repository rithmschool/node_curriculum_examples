const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
