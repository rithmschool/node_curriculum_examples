var express = require("express")
var app = express()
var bodyParser = require("body-parser");
var userRoutes = require("./routes/users")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.send("start with /api/users");
});

app.use('/api/users', userRoutes)

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
