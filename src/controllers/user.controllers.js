const models = require('../models');
const utils = require('../utils');

const signIn = (req, res) => {
  return res.json('SignIn');
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const file = req.file;
    console.log({ file });

    return res.json({ msg: 'user created' });

    // const hash = await utils.bcrypt.encrypt(password);

    // const user = {
    //   avatar: 'avatar', // TODO: Check it.
    //   email,
    //   password: hash,
    // };

    // const data = await models.user.create(user);

    // return res.status(201).json({ data });
  } catch (err) {
    return res.json({ err });
  }
};

module.exports = {
  signIn,
  signUp,
};
