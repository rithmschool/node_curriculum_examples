var express = require("express");
var router = express.Router({mergeParams:true})
var db = require("../models")

router.get("/", function(req,res){
    db.Instructor.findById(req.params.instructor_id).populate('todos').exec().then(function(instructor){
        console.log("TODOS", instructor.todos)
        res.render('todos/index', {instructor})
    }, function(err){
        res.send("ERROR!")
    })
});

router.get("/new", function(req,res){
    db.Instructor.findById(req.params.instructor_id).then(function(instructor){
        res.render("todos/new", {instructor});
    })
});

router.get("/:id", function(req,res){
    db.Todo.findById(req.params.id).populate('instructor').then(function(todo){
        res.render('todos/show', {todo})
    })
});

router.get("/:id/edit", function(req,res){
    db.Todo.findById(req.params.id).populate('instructor').then(function(todo){
        res.render('todos/edit', {todo})
    })
});

router.post("/", function(req,res){
    var newTodo = new db.Todo(req.body)
    newTodo.instructor = req.params.instructor_id
    db.Instructor.findById(req.params.instructor_id).then(function(instructor){
        newTodo.save().then(function(createdTodo){
            instructor.todos.push(createdTodo._id)
            instructor.save().then(function(){
                res.redirect(`instructors/${instructor.id}/todos`)
            })
        })
    })
});

router.patch("/:id", function(req,res){
    db.Todo.findByIdAndUpdate(req.params.id, req.body).then(function(data){
        res.redirect(`/instructors/${req.params.instructor_id}/todos`)
    })
});

router.delete("/:id", function(req,res){
    db.Todo.findByIdAndRemove(req.params.id).then(function(data){
        res.redirect(`/instructors/${req.params.instructor_id}/todos`)
    })
});

module.exports = router;