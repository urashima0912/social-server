const { Router } = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const router = Router();

router.get('/lastestComments', controllers.comment.lastestComments);
router.post('/create', middlewares.auth.isUser, controllers.comment.create);

module.exports = router;
