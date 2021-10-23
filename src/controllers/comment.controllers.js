const models = require('../models');

const lastestComments = async (req, res) => {
  try {
    const comments = await models.comment.find().sort({ createdAt: 'desc' });
    const data = [];
    for (const comment of comments) {
      const post = await models.post.findById(comment.post);
      const user = await models.user.findById(comment.user);
      data.push({
        comment: {
          _id: comment._id,
          description: comment.description,
          title: comment.title,
        },
        post,
        user,
      });
    }

    return res.json({ comments: data });
  } catch (err) {
    return res.json({ msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, description, ownerId, postId } = req.body;

    const user = await models.user.findById(ownerId);
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
