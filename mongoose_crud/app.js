var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var fs = require("fs");

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));

var instructorRoutes = require("./routes/instructors")
app.use('/instructors', instructorRoutes)

app.get('/', function(req,res){
    res.redirect('/instructors')
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
