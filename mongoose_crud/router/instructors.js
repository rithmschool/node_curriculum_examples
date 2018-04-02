// npm packages
const express = require('express');

// app imports
const { Instructor } = require('../models');

// globals
const router = express.Router();

router
  .route('')
  .get((req, res, next) =>
    Instructor.find()
      .then(instructors => res.render('index', { instructors }))
      .catch(err => next(err))
  )
  .post((req, res, next) => {
    const newInst = new Instructor(req.body);
    return newInst
      .save()
      .then(() => res.redirect('/'))
      .catch(err => next(err));
  });

router.route('/new').get((req, res) => {
  return res.render('new');
});

router
  .route('/:id')
  .get((req, res, next) =>
    Instructor.findById(req.params.id)
      .then(instructor => res.render('show', { instructor }))
      .catch(err => next(err))
  )
  .patch((req, res, next) =>
    Instructor.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.redirect('/instructors'))
      .catch(err => next(err))
  )
  .delete((req, res, next) =>
    Instructor.findByIdAndRemove(req.params.id)
      .then(() => res.redirect('/instructors'))
      .catch(err => next(err))
  );

router.get('/:id/edit', (req, res, next) =>
  Instructor.findById(req.params.id)
    .then(instructor => res.render('edit', { instructor }))
    .catch(err => next(err))
);

module.exports = router;
