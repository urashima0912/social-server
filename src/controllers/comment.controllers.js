const models = require('../models');

const lastestComments = (req, res) => {
  return res.json('lastestComments');
};

const create = async (req, res) => {
  try {
    const { title, description, userId, postId } = req.body;

    const user = await models.user.findById(userId);
    if (!user) {
      return res.json({ error: 'Usuario no existe' });
    }

    const post = await models.post.findById(postId);
    if (!post) {
      return res.json({ error: 'Post no existe' });
    }

    const comment = await models.comment.create({
      title,
      description,
      post,
      user,
    });

    return res.json({ comment });
  } catch (err) {
    res.json({ err: err.message });
  }

  return res.json('create');
};

module.exports = {
  lastestComments,
  create,
};
