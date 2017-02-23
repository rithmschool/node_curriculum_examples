var express = require("express");
var router = express.Router();
var db = require("../models");
var authMiddleware = require("../middleware/auth")

router.get('/', authMiddleware.loginRequired, function(req,res){
    res.render('index')
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
                req.session.user_id = user.id
                req.flash('message', 'logged in!')
                res.redirect('/users')
            } else {
                req.flash('message', 'invalid credentials!')
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

router.get('/logout', function(req,res){
    req.session.user_id = null;
    req.flash('message', 'logged out!')
    res.redirect('/users/login')
})

module.exports = router;