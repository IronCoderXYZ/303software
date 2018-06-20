# 303 Software Technical Node Test

Test for 303 Software

Please note: The database configuration is hard-coded rather than being passed in as ENV variables to reduce complexity - the DB Instance is running in a sandbox and therefore does not pose a big risk in this particular instance.

## Getting Started

To get started, follow the installation section below

### Installation

Although all the node_modules are included in the project as per the instructions, use the following commands in case you wish to re-install dependencies.

```
npm i
```

Or

```
yarn
```


## Testing

To run the tests (all API endpoints covered)

```
yarn run test || npm run test
```

To run the tests in watch mode

```
yarn run test-watch || npm run test-watch
```

### Linting

To run ESLint

```
yarn run lint || npm run lint
```

### Seeding

To seed the main database 

```
yarn run seed || npm run seed
```

## Starting

To start the server

```
yarn run start || npm run start
```

To start the server in watch mode

```
yarn run start-watch || npm run start-watch
```

## API End Points

GET /posts

```
Params: None
Action: Returns all posts 
```

GET /posts/:id

```
Params: postId
Action: Returns post with corresponding postId, if there is a match 
```

POST /posts

```
Params: title, content, author
Action: Creates a new post in the database and returns it
```

PATCH /posts/:id

```
Params: postId, newTitle?, newContent?
Action: Updates post with corresponding postId, if there is a match, and returns it
```

DELETE /posts/:id

```
Params: postId
Action: Deletes post with corresponding postId, if there is a match
```

## Built With

* [Express](https://github.com/expressjs) - The server framework
* [Mongoose](https://github.com/Automattic/mongoose) - MongoDB wrapper

## Authors

* **Mitch Hankins** - *Initial work* -
