const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const config = require('./config');

const server = express();

// Settings.
server.set('PORT', process.env.PORT || 4500);

// Middlewares.
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Routes.
server.use('/api/user', routes.user);
server.use('/api/comment', routes.comment);
server.use('/api/post', routes.post);

server.get('/', (req, res) => {
  return res.json({ msg: 'Welcome!!' });
});

// Static folder.
server.use(express.static(path.join(__dirname, 'statics')));

module.exports = server;
