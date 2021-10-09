const values = require('./values');

const config = {
  database: {
    url: 'mongodb://localhost/social',
  },
  jwt: {
    secret: '613b92e493bc7362a0b7ce76',
  },
  imageFolder: './src/statics',

  multer: {
    [values.imageFolder](cb) {
      cb(null, './src/statics/' + values.imageFolder);
    },
    [values.avatarFolder](cb) {
      cb(null, './src/statics/' + values.avatarFolder);
    },
  },
};

module.exports = config;
