var mongoose = require("mongoose");
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/passport_facebook')
mongoose.Promise = Promise

module.exports.User = require("./user")