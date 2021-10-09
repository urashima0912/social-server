const { Router } = require('express');
const controllers = require('../controllers');
const multer = require('multer');
const config = require('../config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.imageFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpeg');
  },
});

const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 100000,
  },
});
const router = Router();

router.post('/signIn', controllers.user.signIn);
router.post('/signUp', uploads.single('avatar'), controllers.user.signUp);

module.exports = router;
