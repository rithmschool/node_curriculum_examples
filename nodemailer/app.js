require('dotenv').load();

var express = require("express")
var app = express()
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended:true}));


var auth = {
  auth: {
    api_key: process.env.SECRET_KEY,
    domain: process.env.DOMAIN
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

app.get("/", function(req,res){
  res.render("index");
});

app.get("/new", function(req,res){
  res.render("new");
});

app.post('/', function(req,res){
    var mailOpts = {
        from: 'elie@yourdomain.com',
        to: req.body.to,
        subject: req.body.subject,
        text : 'test message form mailgun',
        html : '<b>test message form mailgun</b>'
    };

    nodemailerMailgun.sendMail(mailOpts, function (err, response) {
        if (err) res.send(err)
        else {
          res.send('email sent!')
        }
    });
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});