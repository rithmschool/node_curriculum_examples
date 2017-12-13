const express = require('express');

const { Instructor, Todo } = require('../models');

const router = express.Router({ mergeParams: true });

router
  .route('')
  .get((req, res) => {
    return Instructor.findById(req.params.instructor_id)
      .populate('todos')
      .exec()
      .then(instructor => {
        // console.log('TODOS', instructor.todos);
        return res.render('todos/index', { instructor });
      })
      .catch(err => {
        return res.send('ERROR!');
      });
  })
  .post((req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.instructor = req.params.instructor_id;
    return Instructor.findById(req.params.instructor_id).then(instructor => {
      return newTodo.save().then(createdTodo => {
        instructor.todos.push(createdTodo._id);
        instructor.save().then(() => {
          return res.redirect(`/instructors/${instructor.id}/todos`);
        });
      });
    });
  });

router.route('/new').get((req, res) => {
  return Instructor.findById(req.params.instructor_id).then(instructor => {
    return res.render('todos/new', { instructor });
  });
});

router
  .route('/:id')
  .get((req, res) => {
    return Todo.findById(req.params.id)
      .populate('instructor')
      .then(todo => {
        return res.render('todos/show', { todo });
      });
  })
  .patch((req, res) => {
    return Todo.findByIdAndUpdate(req.params.id, req.body).then(() => {
      return res.redirect(`/instructors/${req.params.instructor_id}/todos`);
    });
  })
  .delete((req, res) => {
    return Todo.findByIdAndRemove(req.params.id).then(() => {
      return res.redirect(`/instructors/${req.params.instructor_id}/todos`);
    });
  });

router.get('/:id/edit', (req, res) => {
  return Todo.findById(req.params.id)
    .populate('instructor')
    .then(todo => {
      return res.render('todos/edit', { todo });
    });
});

module.exports = router;
