// npm packages
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');

// globals
const app = express();
const instructorRoutes = require('./routes/instructors');

/*
---Database Config---
This section can be placed into models/index.js or into a different folder, 
e.g. "models" or "settings", just make sure it connects when your server starts.
*/
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/mongoose_intro', {
  useMongoClient: true
});

// settings
app.set('view engine', 'pug');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

// route handlers
app.use('/instructors', instructorRoutes);
app.get('/', (req, res) => {
  return res.redirect('/instructors');
});

// server init
app.listen(5000, () => {
  console.log('Server is listening on port 3000');
});
