const express = require('express');

const router = express.Router();

var id = 1;
const instructors = [];

router
  .route('')
  .get((req, res) => {
    return res.render('index', { instructors });
  })
  .post((req, res) => {
    instructors.push({ id, ...req.body });  // ... is object spread operator
    id++;
    return res.redirect('/instructors');
  });

router
  .route('/new')
  .get((req, res) => {
    return res.render('new');
  });

router
  .route('/:id')
  .get((req, res) => {
    const instructor = instructors.find(v => v.id === Number(req.params.id));
    return res.render('show', { instructor });
  })
  .patch((req, res) => {
    const instructor = instructors.find(v => v.id === Number(req.params.id));
    instructor.name = req.body.name;
    return res.redirect('/instructors');
  })
  .delete((req, res) => {
    const instructorIdx = instructors.findIndex(
      v => v.id === Number(req.params.id)
    );
    instructors.splice(instructorIdx, 1);
    return res.redirect('/instructors');
  });

router
  .route('/:id/edit')
  .get((req, res) => {
    const instructor = instructors.find(v => v.id === Number(req.params.id));
    return res.render('edit', { instructor });
  });

module.exports = router;
