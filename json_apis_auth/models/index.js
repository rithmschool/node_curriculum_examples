var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/users-api-auth')
mongoose.Promise = Promise;

module.exports.User = require("./user")