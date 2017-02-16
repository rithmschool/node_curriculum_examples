var mongoose = require("mongoose");
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/mongoose_intro')

mongoose.Promise = Promise

module.exports.Instructor = require("./instructor")