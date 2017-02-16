var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var fs = require("fs");

var id = 1;
var instructors = []

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get('/', function(req,res){
    res.redirect('/instructors')
});

app.get("/instructors", function(req,res){
    res.render('index', {instructors})
});

app.get("/instructors/new", function(req,res){
    res.render("new");
});

app.get("/instructors/:id", function(req,res){
    var instructor = instructors.find(v => v.id === Number(req.params.id))
    res.render('show', {instructor})
});

app.get("/instructors/:id/edit", function(req,res){
    var instructor = instructors.find(v => v.id === Number(req.params.id))
    res.render('edit', {instructor})
});

app.post("/instructors", function(req,res){
    instructors.push(Object.assign({}, req.body, {id}))
    id++
    res.redirect('/instructors')
});

app.patch("/instructors/:id", function(req,res){
    var instructor = instructors.find(v => v.id === Number(req.params.id))
    instructor.name = req.body.name
    res.redirect('/instructors')
});

app.delete("/instructors/:id", function(req,res){
    var instructorIdx = instructors.findIndex(v => v.id === Number(req.params.id))
    instructors.splice(instructorIdx,1)
    res.redirect('/instructors')
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
