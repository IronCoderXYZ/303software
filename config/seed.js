const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

// Import config to set ENV variables
require('./index');

// Import Post Model
const Post = require('../models/post');

// Mongoose Setup
const uri = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(uri);

// User _id so it can be inserted in seed
const userId = new ObjectID();

// Initial Posts to seed database
const initialPosts = [
  {
    _id: new ObjectID(),
    title: 'First Post',
    author: userId,
    content: 'This is the content of the first post',
  },
  {
    _id: new ObjectID(),
    title: 'Second Post',
    author: userId,
    content: 'This is the content of the second post',
  },
  {
    _id: new ObjectID(),
    title: 'Third Post',
    author: userId,
    content: 'This is the content of the third post',
  },
];

// Clear DB of all entries
Post.remove({})
  // Seed Database
  .then(() => Post.insertMany(initialPosts))
  // Log # of records created and close connection
  .then((posts) => {
    console.log(`${posts.length} posts created`); // eslint-disable-line no-console
    mongoose.connection.close();
  })
  .catch(console.log); // eslint-disable-line no-console
