const jwt = require('jsonwebtoken');
const config = require('../config');
const models = require('../models');
const fs = require('fs/promises');
const path = require('path');

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.json({ err: 'El token no existe!' });
    }

    const data = jwt.verify(token, config.jwt.secret);
    if (!data) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.json({ err: 'El token no existe!' });
    }
    const email = data.data.email;

    const user = await models.user.findOne({ email });
    if (!user) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.json({ err: 'Usuario no existe' });
    }

    req.body.ownerId = user._id;
    next();
  } catch (err) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    return res.json({ err: err.message });
  }
};

module.exports = {
  isUser,
};
