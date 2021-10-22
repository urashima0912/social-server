const values = require('./values');

const config = {
  hostname: 'https://social-server-f.herokuapp.com/',
  database: {
    url: 'mongodb://localhost/social',
    // url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a9grl.mongodb.net/social?retryWrites=true&w=majority`,
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
