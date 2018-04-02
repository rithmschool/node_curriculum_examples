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

module.exports = mongoose.model('Instructor', instructorSchema);
