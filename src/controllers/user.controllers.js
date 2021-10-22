const models = require('../models');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config');
const values = require('../values');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await models.user.findOne({ email });
    if (!user) {
      return res.json('Usuario no encontrado');
    }

    const isValid = await utils.bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json('Usuario no encontrado');
    }

    const data = {
      email: user.email,
    };

    const token = jwt.sign({ data }, config.jwt.secret);

    return res.json({ token, avatar: user.avatar, email });
  } catch (err) {
    return res.json({ err });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hostname = process.env.HOSTNAME;
    const hash = await utils.bcrypt.encrypt(password);
    const file = req.file;

    const user = {
      avatar: hostname + values.avatarFolder + '/' + file.filename,
      email,
      password: hash,
    };

    const data = await models.user.create(user);

    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.json({ err: err.message });
  }
};

module.exports = {
  signIn,
  signUp,
};
