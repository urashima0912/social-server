const models = require('../models');

const upload = (req, res) => {
  return res.json('upload');
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

module.exports = {
  upload,
  recentUploads,
  stast,
  mostPopular,
  details,
  remove,
  like,
};
