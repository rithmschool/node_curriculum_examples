const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose
  .connect('mongodb://localhost/mongoose_intro')
  .then(() => {
    console.log('Successfully connected to DB.');
  })
  .catch(err => {
    console.error(`Error connecting to database: ${err.message}`);
  });

exports.Instructor = require('./instructor');
