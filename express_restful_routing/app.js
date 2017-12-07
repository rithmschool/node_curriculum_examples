// npm packages
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');

// globals
const app = express();
var id = 1;
const instructors = [];

// settings & middleware
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// routes
app.get('/', (req, res) => {
  return res.redirect('/instructors');
});

app.get('/instructors', (req, res) => {
  return res.render('index', { instructors });
});

app.get('/instructors/new', (req, res) => {
  return res.render('new');
});

app.get('/instructors/:id', (req, res) => {
  const instructor = instructors.find(v => v.id === Number(req.params.id));
  return res.render('show', { instructor });
});

app.get('/instructors/:id/edit', (req, res) => {
  const instructor = instructors.find(v => v.id === Number(req.params.id));
  return res.render('edit', { instructor });
});

app.post('/instructors', (req, res) => {
  instructors.push(Object.assign({}, req.body, { id }));
  id++;
  return res.redirect('/instructors');
});

app.patch('/instructors/:id', (req, res) => {
  const instructor = instructors.find(v => v.id === Number(req.params.id));
  instructor.name = req.body.name;
  return res.redirect('/instructors');
});

app.delete('/instructors/:id', (req, res) => {
  const instructorIdx = instructors.findIndex(
    v => v.id === Number(req.params.id)
  );
  instructors.splice(instructorIdx, 1);
  return res.redirect('/instructors');
});

app.listen(3001, () => {
  console.log('Server is listening on port 3000');
});
