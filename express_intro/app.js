const express = require('express');
const app = express();

app.get('/', function(request, response) {
  return response.send('Hello World!');
});

app.get('/user/:name', function(request, response) {
  return response.send(`Hello ${request.params.name}`);
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
