const models = require('../models');
const values = require('../values');
// const fs = require('fs');
const fs = require('fs/promises');
const path = require('path');

const upload = async (req, res) => {
  try {
    const { title, description, ownerId } = req.body;
    const owner = await models.user.findById(ownerId);

    if (!owner) {
      return res.json({ error: 'Usuario no existe' });
    }

    const hostname = 'http://localhost:4500/';
    const file = req.file;
    const filename = hostname + values.imageFolder + '/' + file.filename;

    const post = await models.post.create({
      image: filename,
      title,
      description,
      owner,
    });

    return res.json({ post });
  } catch (err) {
    return res.json({ err: err.message });
  }
};

const recentUploads = (req, res) => {
  return res.json('recentUploads');
};

const stast = (req, res) => {
  return res.json('stast');
};

const mostPopular = (req, res) => {
  return res.json('mostPopular');
};

const details = (req, res) => {
  return res.json('details');
};

const remove = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await models.post.findById(postId);
    if (!post) {
      return res.json({ error: 'Post no existe' });
    }

    const imageSplit = post.image.split('/');
    const fileName = imageSplit[imageSplit.length - 1];
    const imagePath = path.resolve(
      `./src/statics/${values.imageFolder}/` + fileName
    );

    await fs.unlink(imagePath);

    await models.comment.deleteMany({ post });
    const data = await models.post.findByIdAndRemove(postId);

    return res.json({ data });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const like = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await models.post.findById(postId);
    if (!post) {
      return res.json({ error: 'Post no encontrado' });
    }
    post.likes += 1;
    await post.save();

    return res.json({ post });
  } catch (err) {
    return res.json({ err: err.message });
  }
};

const view = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await models.post.findByIdAndUpdate(
      postId,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );

    return res.json({ post });
  } catch (err) {
    return res.json({ err: err.message });
  }
};

module.exports = {
  upload,
  recentUploads,
  stast,
  mostPopular,
  details,
  remove,
  like,
  view,
};
