// npm packages
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// app imports
const { instructorRoutes } = require('./router');

// globals
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.use('/instructors', instructorRoutes);

app.get('/', (req, res) => {
  return res.redirect('/instructors');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
