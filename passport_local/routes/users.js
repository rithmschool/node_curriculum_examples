var express = require("express");
var router = express.Router();
var db = require("../models");
var authMiddleware = require("../middleware/auth")
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    // the first parameter is an optional object with options
{
    // when using the local strategy you MUST name your keys usernameField and passwordField. By default they will have values of "username" and "password", but if you are using something like an email instead of a username or have different name attribute values in your form, modifying the optional object is essential for authentication to work.
    usernameField: 'username',
    passwordField: 'password',
    // by default this option is set to false, but when specified to true, the first parameter of the verify callback will be the request object. This is quite useful if you want to see if your application has multiple strategies and you want to see if a user is already logged in with an existing strategy, if they are you can simply associate the new strategy with them (eg. they have put in their username/password, but then try to authenticate again through twitter)
    passReqToCallback: true,
},
  // the second parameter to the constructor function is known as the verify callback. Since we have set passReqToCallback as true, the first parameter is the request object. The second parameter is the username which comes from user entered data in a form, the third second parameter is the plain text password which comes from user entered data in a form. The fourth parameter is a callback function that will be invoked depending on the result of the verify callback.
  function verifyCallback(req, username, password, done) {
    // find a user in the database based on their username
    db.User.findOne({ username: username }, function (err, user) {
      // if there is an error with the DB connection (NOT related to finding the user successfully or not, return the callback with the error)
      if (err) return done(err);
      // if the user is not found in the database or if the password is not valid, do not return an error (set the first parameter to the done callback as null), but do set the second parameter to be false so that the failureRedirect will be reached.

      // validPassword is a method WE have to create for every object created from our Mongoose model (we call these instance methods or "methods" in Mongoose)
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, function(err,isMatch){
        if(isMatch){
            return done(null, user);
        } else {
            return done(null, false);
        }
      })
      // if the user has put in the correct username and password, move onto the next step and serialize! Pass into the serialization function as the first parameter the user who was successfull found (we will need it's id to store in the session and cookie)

    });
  }
));

// this code is ONLY run if the verify callback returns the done callback with no errors and a truthy value as the second parameter. This code only runs once per session and runs a callback function which we can assume will not have any errors (null as the first parameter) and the data we want to put in the session (only the user.id). The successCallback is run next!
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// once a user has been authenticated and serialized, we now find that user in the database on every request. This allows passport to have some useful methods on the request object like req.user (the current user logged in) and req.isAuthenticated() (returns true if the user is logged in or false if not)
passport.deserializeUser(function(id, done) {
  db.User.findById(id).then(function(user) {
    done(null, user);
  });
});

router.get('/', authMiddleware.loginRequired, function(req,res){
    res.render('index')
});

router.get('/login', function(req,res){
    res.render('login')
});

router.get('/signup', function(req,res){
    res.render('new')
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/users',
    failureRedirect: '/users/login'}));


router.post('/signup', function(req,res){
    db.User.create(req.body).then(function(user){
         req.logIn(user, function(err) {
             return res.redirect(`/users`);
         });
     }, function(err){
         return next(err);
     });
});

router.get('/logout', function(req,res){
    req.logout()
    req.flash('message', 'logged out!')
    res.redirect('/users/login')
})

module.exports = router;