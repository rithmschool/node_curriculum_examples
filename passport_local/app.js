require('dotenv').load();
var express = require("express")
var app = express()
var methodOverride = require("method-override")
var morgan = require("morgan")
var bodyParser = require("body-parser");
var userRoutes = require("./routes/users");
var session = require("cookie-session");
var flash = require("connect-flash")
var passport = require("passport");

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(session({secret:process.env.SECRET_KEY}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.get("/", function(req,res){
  res.redirect("/users/login");
});

// send flash messages to all routes
app.use(function(req, res, next){
    res.locals.message = req.flash('message');
    next();
});

app.use('/users', userRoutes)

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
