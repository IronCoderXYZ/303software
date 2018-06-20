const mongoose = require('mongoose');

// Define Post Model
const Post = mongoose.model('Post', {
  // _id is set by mongoDB automatically - therefore I omitted it
  title: {
    type: String,
    required: true,
  },
  // Can hold mongo _id or text
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = Post;
