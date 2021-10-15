const models = require('../models');
const values = require('../values');
// const fs = require('fs');
const fs = require('fs/promises');
const path = require('path');
const config = require('../config');

const upload = async (req, res) => {
  try {
    const { title, description, ownerId } = req.body;
    const owner = await models.user.findById(ownerId);

    if (!owner) {
      return res.json({ error: 'Usuario no existe' });
    }

    const hostname = config.hostname;
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

const recentUploads = async (req, res) => {
  try {
    const uploads = await models.post.find().sort({ createdAt: 'desc' });

    return res.json({ uploads });
  } catch (err) {
    return res.json({ msg: err.message });
  }
};

const stast = async (req, res) => {
  try {
    const images = await models.post.countDocuments();
    const comments = (await models.comment.find()).length;

    const countPosts = await models.post.countDocuments();
    let views = 0;
    if (countPosts > 0) {
      const result = await models.post.aggregate([
        {
          $group: {
            _id: '1',
            views: { $sum: '$views' },
          },
        },
      ]);

      views = result[0].views;
    }

    let likes = 0;
    const posts = await models.post.find();
    for (const post of posts) {
      likes = likes + post.likes;
    }

    // const like2 = await models.post.aggregate([
    //   {
    //     $group: {
    //       _id: '1',
    //       likes: { $sum: '$likes' },
    //     },
    //   },
    // ]);

    return res.json({
      images,
      comments,
      views,
      likes,
      // like2: like2[0].likes,
    });
  } catch (err) {
    return res.json({ msg: err.message });
  }
};

const mostPopular = async (req, res) => {
  try {
    const uploads = await models.post.find().sort({ views: 'desc' }).limit(2);

    console.log({ uploads });

    return res.json({ uploads });
  } catch (err) {
    return res.json({ msg: err.message });
  }
};

const details = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await models.post.findById(postId);
    const comments = await models.comment.find({ post });

    return res.json({ post, comments });
  } catch (err) {
    return res.json({ msg: err.message });
  }
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
