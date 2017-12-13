const express = require('express');

const { Instructor } = require('../models');

const router = express.Router();

router
  .route('')
  .get((req, res) => {
    return Instructor.find()
      .then(instructors => {
        return res.render('instructors/index', { instructors });
      })
      .catch(err => next(err));
  })
  .post((req, res) => {
    return Instructor.create(req.body)
      .then(() => {
        return res.redirect('/');
      })
      .catch(err => next(err));
  });

router.route().get('/new', (req, res) => {
  return res.render('instructors/new');
});

router
  .route('/:id')
  .get((req, res) => {
    return Instructor.findById(req.params.id).then(instructor => {
      return res
        .render('instructors/show', { instructor })
        .catch(err => next(err));
    });
  })
  .patch((req, res) => {
    return Instructor.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        return res.redirect('/instructors');
      })
      .catch(err => next(err));
  })
  .delete((req, res) => {
    return Instructor.findByIdAndRemove(req.params.id)
      .then(() => {
        return res.redirect('/instructors');
      })
      .catch(err => next(err));
  });

router.route('/:id/edit').get((req, res) => {
  return Instructor.findById(req.params.id)
    .then(instructor => {
      return res.render('instructors/edit', { instructor });
    })
    .catch(err => next(err));
});

module.exports = router;
