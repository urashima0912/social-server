const models = require('../models');

const signIn = (req, res) => {
  return res.json('SignIn');
};

const signUp = (req, res) => {
  return res.json('signUp');
};

module.exports = {
  signIn,
  signUp,
};
