const { Router } = require('express');
const controllers = require('../controllers');
const multer = require('multer');

const uploads = multer({
  dest: './src/statics/',
});
const router = Router();

router.post('/signIn', controllers.user.signIn);
router.post('/signUp', uploads.single('avatar'), controllers.user.signUp);

module.exports = router;
