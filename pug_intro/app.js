const express = require('express');
const app = express();

const instructors = ['Elie', 'Tim', 'Matt'];

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  return res.render('index', { instructors });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
