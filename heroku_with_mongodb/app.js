// npm packages
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//app imports
const instructorRoutes = require('./routes/instructors');
const todoRoutes = require('./routes/todos');

// globals
const app = express();

// middleware
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.use('/instructors', instructorRoutes);
app.use('/instructors/:instructor_id/todos', todoRoutes);

app.get('/', (req, res) => {
  return res.redirect('/instructors');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
