const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema(
  {
    first: String,
    last: String,
    programmingLanguages: [String],
    favoriteSubjects: [String]
  },
  { timestamps: true } // automatically add createdAt and updatedAt
);

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
