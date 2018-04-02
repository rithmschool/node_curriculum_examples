const express = require('express');
const router = express.Router();
const { Instructor } = require('../models');

router
  .route('/')
  .get((req, res, next) => {
    Instructor.find()
      .then(instructors => res.render('instructors/index', { instructors }))
      .catch(err => next(err));
  })
  .post((req, res, next) =>
    Instructor.create(req.body)
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  );

router.route('/new').get((req, res) => res.render('instructors/new'));

router
  .route('/:id')
  .get((req, res, next) =>
    Instructor.findById(req.params.id)
      .then(instructor => res.render('instructors/show', { instructor }))
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

router.route('/:id/edit').get((req, res, next) =>
  Instructor.findById(req.params.id)
    .then(instructor => res.render('instructors/edit', { instructor }))
    .catch(err => next(err))
);

module.exports = router;
