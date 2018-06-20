const { ObjectID } = require('mongodb');

// Import Post Model
const Post = require('../../models/post');

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

const populatePosts = (done) => {
  // Clear DB of all entries
  Post.remove({})
    // Seed Test Database
    .then(() => Post.insertMany(initialPosts))
    .then(() => done());
};

module.exports = { initialPosts, populatePosts, userId };
