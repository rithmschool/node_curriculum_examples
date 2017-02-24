var express = require("express");
var router = express.Router();
var db = require("../models")
var auth = require('../middleware/auth')

router.get('/', function(req,res){
    db.User.find().then(function(users){
        res.status(200).send(users)
    });
});

router.get('/:id', function(req,res){
    db.User.findById(req.params.id).then(function(user){
        res.status(200).send(user)
    });
});

router.post('/', function(req,res){
    db.User.create(req.body).then(function(user){
        res.status(201).send(user)
    });
});

router.patch('/:id', auth.ensureCorrectUser, function(req,res){
    db.User.findByIdAndUpdate(req.params.id, req.body, {new:true}).then(function(user){
        res.status(200).send(user)
    });
});

router.delete('/:id', auth.ensureCorrectUser, function(req,res){
    db.User.findByIdAndRemove(req.params.id).then(function(user){
        res.status(204).send(user)
    });
});

module.exports = router;