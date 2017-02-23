var mongoose = require("mongoose");
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/cookies_sessions')
mongoose.Promise = Promise

module.exports.User = require("./user")