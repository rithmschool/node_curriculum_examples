const express = require('express');

const router = express.Router({ mergeParams: true }); // preserve parent route parameters

const { Instructor, Todo } = require('../models');

router
  .route('/')
  .get((req, res, next) =>
    Instructor.findById(req.params.instructorId)
      .populate('todos')
      .exec()
      .then(instructor => res.render('todos/index', { instructor }))
      .catch(err => next(err))
  )
  .post((req, res, next) => {
    // build new todo document
    const newTodo = new Todo(req.body);
    newTodo.instructor = req.params.instructorId;
    // find instructor document
    return Instructor.findById(req.params.instructorId)
      .then(instructor =>
        // save new todo document
        newTodo
          .save()
          .then(createdTodo => {
            // add new todo ID to instructor document
            instructor.todos.push(createdTodo._id);
            return instructor
              .save()
              .then(() => res.redirect(`/instructors/${instructor.id}/todos`))
              .catch(err => next(err));
          })
          .catch(err => next(err))
      )
      .catch(err => next(err));
  });

router.get('/new', (req, res, next) =>
  Instructor.findById(req.params.instructorId)
    .then(instructor => res.render('todos/new', { instructor }))
    .catch(err => next(err))
);

router
  .route('/:id')
  .get((req, res, next) => {
    Todo.findById(req.params.id)
      .populate('instructor')
      .then(todo => res.render('todos/show', { todo }))
      .catch(err => next(err));
  })
  .patch((req, res, next) =>
    Todo.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.redirect(`/instructors/${req.params.instructorId}/todos`))
      .catch(err => next(err))
  )
  .delete((req, res, next) =>
    Todo.findByIdAndRemove(req.params.id)
      .then(() => res.redirect(`/instructors/${req.params.instructorId}/todos`))
      .catch(err => next(err))
  );

router.get('/:id/edit', (req, res, next) =>
  Todo.findById(req.params.id)
    .populate('instructor')
    .then(todo => res.render('todos/edit', { todo }))
    .catch(err => next(err))
);

module.exports = router;
