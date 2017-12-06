const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

const instructorRoutes = require('./routes');
app.use('/instructors', instructorRoutes);

app.get('/', (req, res) => {
  return res.redirect('/instructors');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
