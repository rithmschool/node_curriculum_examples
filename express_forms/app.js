const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  return res.redirect('/form-with-get');
});

app.get('/form-with-get', function(req, res) {
  return res.render('form-with-get');
});

app.get('/form-with-post', function(req, res) {
  return res.render('form-with-post');
});

app.get('/submit-form-with-get', function(req, res) {
  return res.send(req.query);
});

app.post('/submit-form-with-post', function(req, res) {
  return res.send(req.body);
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
