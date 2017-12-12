// npm packages
const express = require('express');

// app imports
const { Instructor } = require('../models');

// globals
const router = express.Router();

router
  .route('')
  .get((req, res) => {
    return Instructor.find()
      .then(instructors => {
        return res.render('index', { instructors });
      })
      .catch(err => {
        return res.send('ERROR!');
      });
  })
  .post((req, res) => {
    return Instructor.create(req.body).then(() => {
      return res.redirect('/');
    });
  });

router.route('/new').get((req, res) => {
  return res.render('new');
});

router
  .route('/:id')
  .get((req, res) => {
    return Instructor.findById(req.params.id).then(instructor => {
      return res.render('show', { instructor });
    });
  })
  .patch((req, res) => {
    return Instructor.findByIdAndUpdate(req.params.id, req.body).then(data => {
      return res.redirect('/instructors');
    });
  })
  .delete((req, res) => {
    return Instructor.findByIdAndRemove(req.params.id).then(data => {
      return res.redirect('/instructors');
    });
  });

router.get('/:id/edit', (req, res) => {
  return Instructor.findById(req.params.id).then(instructor => {
    return res.render('edit', { instructor });
  });
});

module.exports = router;
