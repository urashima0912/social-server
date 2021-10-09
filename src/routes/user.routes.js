const { Router } = require('express');
const controllers = require('../controllers');
const uploads = require('../utils').multer;
const router = Router();
const values = require('../values');

router.post('/signIn', controllers.user.signIn);
router.post(
  '/signUp',
  uploads.single(values.avatarFolder),
  controllers.user.signUp
);

module.exports = router;
