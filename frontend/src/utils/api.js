
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

export async function fetchCategories() {
  let categories = await fetch(API_URL + 'categories', { headers })
  let data = await categories.json()
  return data.categories
}

export async function fetchPosts() {
  let posts = await fetch(API_URL + 'posts', { headers })
  return posts.json()
}

export async function fetchPostDetail(postId) {
  let post = await fetch(API_URL + 'posts/' + postId, { headers })
  return post.json()
}

export async function fetchComments(postId) {
  let comments = await fetch(`${API_URL}posts/${postId}/comments`, { headers })
  return comments.json()
}

export async function addComment(comment) {
  let response = await fetch(`${API_URL}comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
  return response.json()
}

export async function removeComment(commentId) {
  let response = await fetch(`${API_URL}comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    }
  })
  return response.json()
}

export async function editComment(comment) {
  let response = await fetch(`${API_URL}comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
  return response.json()
}

export async function upVoteComment(commentId) {
  let response = await fetch(`${API_URL}comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({option: 'upVote'}),
  })
  return response.json()
}

export async function downVoteComment(commentId) {
  let response = await fetch(`${API_URL}comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({option: 'downVote'}),
  })
  return response.json()
}

export async function upVotePost(postId) {
  let response = await fetch(`${API_URL}posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({option: 'upVote'}),
  })
  return response.json()
}

export async function downVotePost(postId) {
  let response = await fetch(`${API_URL}posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({option: 'downVote'}),
  })
  return response.json()
}

export async function addPost(post) {
  let response = await fetch(`${API_URL}posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
  return response.json()
}

export async function removePost(postId) {
  let response = await fetch(`${API_URL}posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    }
  })
  return response.json()
}

export async function editPost(post) {
  let response = await fetch(`${API_URL}posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
  return response.json()
}

/*
    Welcome to the Udacity Readable API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /categories
      USAGE:
        Get all of the categories available for the app. List is found in categories.js.
        Feel free to extend this list as you desire.

    GET /:category/posts
      USAGE:
        Get all of the posts for a particular category

    GET /posts
      USAGE:
        Get all of the posts. Useful for the main page when no category is selected.

    POST /posts
      USAGE:
        Add a new post

      PARAMS:
        id - UUID should be fine, but any unique id will work
        timestamp - timestamp in whatever format you like, you can use Date.now() if you like
        title - String
        body - String
        author - String
        category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

    GET /posts/:id
      USAGE:
        Get the details of a single post

    POST /posts/:id
      USAGE:
        Used for voting on a post
      PARAMS:
        option - String: Either "upVote" or "downVote"

    PUT /posts/:id
      USAGE:
        Edit the details of an existing post
      PARAMS:
        title - String
        body - String

    DELETE /posts/:id
      USAGE:
        Sets the deleted flag for a post to 'true'.
        Sets the parentDeleted flag for all child comments to 'true'.

    GET /posts/:id/comments
      USAGE:
        Get all the comments for a single post

    POST /comments
      USAGE:
        Add a comment to a post

      PARAMS:
        id: Any unique ID. As with posts, UUID is probably the best here.
        timestamp: timestamp. Get this however you want.
        body: String
        author: String
        parentId: Should match a post id in the database.

    GET /comments/:id
      USAGE:
        Get the details for a single comment

    POST /comments/:id
      USAGE:
        Used for voting on a comment.
      PARAMS:
        option - String: Either "upVote" or "downVote"

    PUT /comments/:id
      USAGE:
        Edit the details of an existing comment

      PARAMS:
        timestamp: timestamp. Get this however you want.
        body: String

    DELETE /comments/:id
      USAGE:
        Sets a comment's deleted flag to 'true'
*/