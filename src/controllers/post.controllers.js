const models = require('../models');
const values = require('../values');

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

const remove = (req, res) => {
  return res.json('remove');
};

const like = (req, res) => {
  return res.json('like');
};

const view = (req, res) => {
  return res.json('view');
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
