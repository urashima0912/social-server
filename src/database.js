const mongoose = require('mongoose');
const config = require('./config');

console.log('xxx URI: ', config.database.url);

mongoose
  .connect(config.database.url)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });
