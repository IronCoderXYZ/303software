/* eslint-disable */

const expect = require('expect');
const supertest = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../server');
const Post = require('../models/post');
const { initialPosts, populatePosts, userId } = require('./seed');

// Before each test, reseed the DB
beforeEach(populatePosts);

// Get all posts
describe('GET /posts', () => {
  // Fetch all posts
  it('Should get all posts', done => {
    supertest(app)
      .get('/posts')
      .expect(200)
      .expect(res => {
        expect(res.body.posts.length).toBe(3);
      })
      .end(done);
  });
});

// Get post by id
describe('GET /posts/:id', () => {
  it('Should get a post with a valid id', done => {
    supertest(app)
      .get(`/posts/${initialPosts[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.post.author).toBe(userId.toHexString());
        expect(res.body.post.title).toBe(initialPosts[0].title);
        expect(res.body.post.content).toBe(initialPosts[0].content);
      })
      .end(done);
  });

  it('Should return 404 if post not found', done => {
    // Provide new ObjectID so it doesn't match any DB record
    supertest(app)
      .get(`/posts/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for invalid id', done => {
    supertest(app)
      .get('/posts/thisIsAnInvalidObjectID')
      .expect(404)
      .end(done);
  });
});

// Create a new post
describe('POST /posts', () => {
  it('Should create a new post if valid values are given', done => {
    const title = 'Test Post';
    const content = 'This is the content of the test post';

    supertest(app)
      .post('/posts')
      .send({ title, content, author: userId })
      .expect(200)
      .expect(res => {
        expect(res.body.title).toBe(title);
        expect(res.body.content).toBe(content);
        expect(res.body.author).toBe(userId.toHexString());
      })
      .end((err, res) => {
        if (err) return done(err);
        Post.find({ title, content, author: userId })
          .then(posts => {
            expect(posts.length).toBe(1);
            expect(posts[0].title).toBe(title);
            expect(posts[0].content).toBe(content);
            done();
          })
          .catch(error => done(error));
      });
  });

  it('Should not create a new post if invalid values were given', done => {
    supertest(app)
      .post('/posts')
      .send({})
      .expect(400)
      .end(done);
  });
});

// Update a post
describe('PATCH /posts/:id', () => {
  it('Should update a post if valid values are given', done => {
    const newTitle = 'This is a new title';
    const newContent = 'This is the new content';
    const postId = initialPosts[0]._id.toHexString();

    supertest(app)
      .patch(`/posts/${postId}`)
      .send({ title: newTitle, content: newContent })
      .expect(200)
      .expect(res => {
        expect(res.body.post.title).toBe(newTitle);
        expect(res.body.post.content).toBe(newContent);
        expect(res.body.post.author).toBe(userId.toHexString());
      })
      .end(done);
  });
});

// Delete a post
describe('DELETE /posts/:id', () => {
  it('Should remove a post when valid values are given', done => {
    const postId = initialPosts[1]._id.toHexString();

    supertest(app)
      .delete(`/posts/${postId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.post._id).toBe(postId);
      })
      .end((err, res) => {
        if (err) return done(err);
        Post.findById(postId)
          .then(post => {
            expect(post).toBeFalsy();
            done();
          })
          .catch(err => done(err));
      });
  });

  it('Should return 404 if post was not found', done => {
    supertest(app)
      .delete(`/posts/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 if provided objectID is invalid', done => {
    supertest(app)
      .delete('/posts/thisIsAnInvalidObjectID')
      .expect(404)
      .end(done);
  });
});
