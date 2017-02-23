var mongoose = require("mongoose");
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/passport_local')
mongoose.Promise = Promise

module.exports.User = require("./user")