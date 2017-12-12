const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/mongoose_intro', {
  useMongoClient: true
});

mongoose.Promise = Promise;

module.exports.Instructor = require('./instructor');
