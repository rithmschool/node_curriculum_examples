var express = require("express"),
app = express();
app.use(express.static(__dirname + '/public'))
var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.on('connection', function(socket){
  socket.on('join', function(name){
    socket.username = name
    io.sockets.emit("addChatter", name);
  });

  socket.on('messages', function(message){
    username = socket.username
    io.sockets.emit("messages", {username,message});
  });

  socket.on('disconnect', function(name){
    io.sockets.emit("removeChatter", socket.username);
  });
});

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080, function(){
  console.log('Server started on port 8080')
});
