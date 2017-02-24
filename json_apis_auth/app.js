var express = require("express")
var app = express()
var bodyParser = require("body-parser");
var userRoutes = require("./routes/users")
var authRoutes = require("./routes/auth")
var authMiddleware = require("./middleware/auth")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.send("start with /api/users");
});

app.use('/api/users', authMiddleware.loginRequired, userRoutes)
app.use('/api/auth', authRoutes)

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
