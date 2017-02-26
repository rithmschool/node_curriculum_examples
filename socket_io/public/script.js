$(document).ready(function(){
  var socket = io.connect('http://localhost:8080');

  var username = prompt("whats your name?");
  socket.emit('join', username);

  $("#chatForm").on('submit', function(e){
    e.preventDefault();
    var message = $("#message").val();
    socket.emit('messages',message)
    $("#message").val("");
  })

  socket.on('messages', function(data){
    $message = $("<li>", {
      text: `${data.username} says ${data.message}`
    })
    $("#messagesContainer").append($message);
  })

  socket.on('addChatter', function(name){
    var $chatter = $("<li>", {
      text: name,
      attr: {
        'data-name':name
      }
    })
    $("#chatters").append($chatter)
  })

  socket.on("removeChatter", function(name){
    debugger
    $("#chatters li[data-name=" + name +"]").remove()
  })
})