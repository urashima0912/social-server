const multer = require('multer');
const config = require('../config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    config.multer[file.fieldname](cb);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpeg');
  },
});

const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
});

module.exports = uploads;
