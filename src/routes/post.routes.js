const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.post('/upload', controllers.post.upload);
router.get('/recentUploads', controllers.post.recentUploads);
router.get('/stast', controllers.post.stast);
router.get('/mostPopular', controllers.post.mostPopular);
router.get('/details/:postId', controllers.post.details);
router.delete('/remove', controllers.post.remove);
router.post('/like', controllers.post.like);

module.exports = router;
