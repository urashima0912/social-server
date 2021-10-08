const models = require('../models');

const lastestComments = (req, res) => {
  return res.json('lastestComments');
};

const create = (req, res) => {
  return res.json('create');
};

module.exports = {
  lastestComments,
  create,
};
