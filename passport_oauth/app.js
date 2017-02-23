require('dotenv').load();
var express = require("express")
var app = express()
var methodOverride = require("method-override")
var morgan = require("morgan")
var bodyParser = require("body-parser");
var session = require("cookie-session");
var flash = require("connect-flash")
var passport = require("passport");
var db = require("./models");
var FacebookStrategy = require('passport-facebook').Strategy;


app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(session({secret:process.env.SECRET_KEY}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

function loginRequired(req,res,next){
  if(req.isUnauthenticated()){
    res.redirect('/')
  } else {
    next()
  }
}

app.get("/", function(req,res){
  res.send('Go to /auth/facebook')
});

app.get("/welcome", loginRequired, function(req,res){
  res.send('Logged In!')
});

app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/welcome',
                                      failureRedirect: '/login' }));


// send flash messages to all routes
app.use(function(req, res, next){
    res.locals.message = req.flash('message');
    next();
});

passport.use(new FacebookStrategy({
    // these should ALL be values coming from a .env file
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    // when you deploy your application you can add an environment variable for CALLBACK_URL, right now let's stick with localhost:3000/auth/facebook/callback
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/facebook/callback"
  },
  // in the verify callback we will get an accessToken to make authenticated requests on the users behalf along with a refreshToken which is used in some authentication strategies to refresh an expired accessToken. We also are given an object called "profile" which has data on the authenticated user
  function(accessToken, refreshToken, profile, done) {
    db.User.findOrCreate({facebook_id: profile.id}, function(err,user) {
      if(err) return done(err)
      done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.get('/logout', function(req,res){
    req.logout()
    req.flash('message', 'logged out!')
    res.send('logged out!')
})

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
