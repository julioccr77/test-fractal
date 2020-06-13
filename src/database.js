const mongoose = require('mongoose');
const URI = 'mongodb://localhost/fractal-test';

mongoose.connect(URI)
  .then(db => console.log('database is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
