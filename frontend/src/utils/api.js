
const API_URL = 'http://localhost:3001/'

// Generate a unique token
let token = localStorage.token
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function fetchCategories() {
  return fetch(API_URL + 'categories', { headers })
    .then((res) => res.json())
    .then(data => data.categories)
}

export function fetchPosts() {
  return fetch(API_URL + 'posts', { headers })
    .then((res) => res.json())
}

export function fetchPostDetail(postId) {
  return fetch(API_URL + 'posts/' + postId, { headers })
    .then((res) => res.json())
}

export function fetchComments(postId) {
  return fetch(`${API_URL}posts/${postId}/comments`, { headers })
    .then((res) => res.json())
}

// Welcome to the Udacity Readable API!

// GET /:category/posts
//   USAGE:
//     Get all of the posts for a particular category

// POST /posts
//   USAGE:
//     Add a new post

//   PARAMS:
//     id - UUID should be fine, but any unique id will work
//     timestamp - timestamp in whatever format you like, you can use Date.now() if you like
//     title - String
//     body - String
//     author - String
//     category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

// POST /posts/:id
//   USAGE:
//     Used for voting on a post
//   PARAMS:
//     option - String: Either "upVote" or "downVote"

// PUT /posts/:id
//   USAGE:
//     Edit the details of an existing post
//   PARAMS:
//     title - String
//     body - String

// DELETE /posts/:id
//   USAGE:
//     Sets the deleted flag for a post to 'true'.
//     Sets the parentDeleted flag for all child comments to 'true'.

// POST /comments
//   USAGE:
//     Add a comment to a post

//   PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
//     author: String
//     parentId: Should match a post id in the database.

// GET /comments/:id
//   USAGE:
//     Get the details for a single comment

// POST /comments/:id
//   USAGE:
//     Used for voting on a comment.
//   PARAMS:
//     option - String: Either "upVote" or "downVote"

// PUT /comments/:id
//   USAGE:
//     Edit the details of an existing comment

//   PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String

// DELETE /comments/:id
//   USAGE:
//     Sets a comment's deleted flag to 'true'