// npm packages
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// app imports
const { instructorsRouter } = require('./router');

// globals
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.get('/', (req, res) => res.redirect('/instructors'));
app.use('/instructors', instructorsRouter);

// global error handler
app.use((err, req, res, next) =>
  res.status(err.status || 500).render('error', {
    message: err.message || 'Something went wrong!',
    title: err.title || 'Internal Server Error'
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
