var express = require("express");
var router = express.Router();
var db = require("../models");

router.get('/', function(req,res){
    res.send('logged in!')
});

router.get('/login', function(req,res){
    res.render('login')
});

router.get('/signup', function(req,res){
    res.render('new')
});

router.post('/login', function(req,res){
    db.User.findOne({username: req.body.username}).then(function(user){
        user.comparePassword(req.body.password, function(err, isMatch){
            if(isMatch){
                res.redirect('/users')
            } else {
                res.redirect('/users/login')
            }
        })
    }, function(err){
        res.send(err)
    })
});

router.post('/signup', function(req,res){
    db.User.create(req.body).then(function(user){
        res.redirect('/users/login')
    })
});

module.exports = router;