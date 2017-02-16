var express = require("express");
var router = express.Router()
var db = require("../models")

router.get("/", function(req,res){
    // db.Instructor.find({}, function(err,instructors){
    //     res.render('index', {instructors})
    // })

    db.Instructor.find().then(function(instructors){
        res.render('index', {instructors})
    }, function(err){
        res.send("ERROR!")
    })
});

router.get("/new", function(req,res){
    res.render("new");
});

router.get("/:id", function(req,res){
    db.Instructor.findById(req.params.id).then(function(instructor){
        res.render('show', {instructor})
    })
});

router.get("/:id/edit", function(req,res){
    db.Instructor.findById(req.params.id).then(function(instructor){
        res.render('edit', {instructor})
    })
});

router.post("/", function(req,res){
    db.Instructor.create(req.body).then(function(){
        res.redirect('/')
    })
});

router.patch("/:id", function(req,res){
    db.Instructor.findByIdAndUpdate(req.params.id, req.body).then(function(data){
        res.redirect('/instructors')
    })
});

router.delete("/:id", function(req,res){
    db.Instructor.findByIdAndRemove(req.params.id).then(function(data){
        res.redirect('/instructors')
    })
});

module.exports = router