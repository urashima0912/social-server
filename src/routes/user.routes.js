const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/signIn', controllers.user.signIn);
router.post('/signUp', controllers.user.signUp);

module.exports = router;
