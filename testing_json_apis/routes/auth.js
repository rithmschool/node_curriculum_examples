var express = require("express");
var router = express.Router();
var db = require("../models")
var jwt = require('jsonwebtoken');

router.post('/login', function(req,res){
    db.User.findOne({username: req.body.username}).then(function(user){
        user.comparePassword(req.body.password, function(err, isMatch){
            if(isMatch){
                var token = jwt.sign({ user_id: user.id}, process.env.SECRET_KEY);
                res.status(200).send({token})
            } else {
                res.status(400).send('Invalid Credentials')
            }
        })
    }, function(err){
        res.status(400).send('Invalid Credentials')
    })
});

router.post('/signup', function(req,res){
    db.User.create(req.body).then(function(user){
        var token = jwt.sign({ user_id: user.id}, process.env.SECRET_KEY);
        res.status(201).send({token})
    })
});

router.get('/logout', function(req,res){
    req.session.user_id = null;
    req.flash('message', 'logged out!')
    res.redirect('/users/login')
})

module.exports = router;
