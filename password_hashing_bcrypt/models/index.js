var mongoose = require("mongoose");
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/bcrypt_app')
mongoose.Promise = Promise

module.exports.User = require("./user")