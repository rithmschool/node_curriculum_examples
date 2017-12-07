// npm packages
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const methodOverride = require('method-override');
const morgan = require('morgan');

// globals
const app = express();
const instructorRoutes = require('./routes/instructors');

/*
---Database Config---
This section can be placed into models/index.js or into a different folder, e.g. "settings",
just make sure you require it in the app.js file so that it connects when your server starts.
*/
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/mongoose_intro', {
  useMongoClient: true
});

// settings
app.set('view engine', 'pug');

// middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

// route handlers
app.use('/instructors', instructorRoutes);
app.get('/', (req, res) => {
  return res.redirect('/instructors');
});

// server init
app.listen(5000, function() {
  console.log('Server is listening on port 3000');
});
