var express = require('express');
var router = express.Router();

var id = 1;
var instructors = [];

router.get('/', (req, res) => {
  return res.render('index', { instructors });
});

router.get('/new', (req, res) => {
  return res.render('new');
});

router.get('/:id', (req, res) => {
  var instructor = instructors.find(v => v.id === Number(req.params.id));
  return res.render('show', { instructor });
});

router.get('/:id/edit', (req, res) => {
  var instructor = instructors.find(v => v.id === Number(req.params.id));
  return res.render('edit', { instructor });
});

router.post('', (req, res) => {
  instructors.push(Object.assign({}, req.body, { id }));
  id++;
  return res.redirect('/instructors');
});

router.patch('/:id', (req, res) => {
  var instructor = instructors.find(v => v.id === Number(req.params.id));
  instructor.name = req.body.name;
  return res.redirect('/instructors');
});

router.delete('/:id', (req, res) => {
  var instructorIdx = instructors.findIndex(
    v => v.id === Number(req.params.id)
  );
  instructors.splice(instructorIdx, 1);
  return res.redirect('/instructors');
});

module.exports = router;
