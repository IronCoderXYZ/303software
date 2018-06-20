// Import config to set ENV variables
require('./config');
const _ = require('lodash');
const express = require('express');
const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');

const Post = require('./models/post');
const mongoose = require('./db/mongoose'); // eslint-disable-line no-unused-vars

const app = express();
const port = process.env.PORT;

// Helper function to check if provided id is valid
const checkId = id => ObjectID.isValid(id);

app.use(bodyParser.json());

// Get all posts
app.get('/posts', (req, res) => {
  Post.find()
    .then(posts => res.send({ posts }))
    .catch(() => res.status(400).send());
});

// Get post by id
app.get('/posts/:id', (req, res) => {
  // Check for invalid id
  if (!checkId(req.params.id)) {
    return res.status(404).send();
  }
  return Post.findById(req.params.id)
    .then((post) => {
      // If no post is found
      if (!post) {
        return res.status(404).send();
      }
      return res.send({ post });
    })
    .catch(() => res.status(400).send());
});

// Post / create new post
app.post('/posts', (req, res) => {
  // Use lodash to pick required properties off the request body
  const params = _.pick(req.body, ['title', 'content', 'author']);
  new Post(params)
    .save()
    .then(post => res.send(post))
    .catch(() => res.status(400).send());
});

// Update a post
app.patch('/posts/:id', (req, res) => {
  // Check for invalid id
  if (!checkId(req.params.id)) {
    return res.status(404).send();
  }
  // Pick params and use the Post model to set the new params
  const params = _.pick(req.body, ['title', 'content']);
  return Post.findByIdAndUpdate(req.params.id, { $set: params }, { new: true })
    .then((post) => {
      if (!post) {
        return res.status(404).send();
      }
      return res.send({ post });
    })
    .catch(() => res.status(400).send());
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
  // Check for invalid id
  if (!checkId(req.params.id)) {
    return res.status(404).send();
  }
  return Post.findByIdAndRemove(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).send();
      }
      return res.send({ post });
    })
    .catch(() => res.status(400).send());
});

app.listen(port, () => console.log(`Server listening on port: ${port}`)); // eslint-disable-line no-console

module.exports = app;
