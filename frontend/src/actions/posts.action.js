import * as ReadableAPI from '../utils/api'

export const SET_POSTS = 'SET_POSTS'
export const GET_POST_DETAIL = 'GET_POST_DETAIL'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'


export function fetchPosts() {
  return async dispatch => {
    let posts = await ReadableAPI.fetchPosts();
    dispatch(setPosts(posts));
  }
}

function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  };
}

export function fetchPostDetail(postId) {
  return async dispatch => {
    let details = await ReadableAPI.fetchPostDetail(postId);
    dispatch(getPostDetail(details));
  }
}

function getPostDetail(details) {
  return {
    type: GET_POST_DETAIL,
    details
  };
}

export function upVotePost(postId) {
  return async dispatch => {
    await ReadableAPI.upVotePost(postId)
    dispatch(upVotePostAction());
  }
}

function upVotePostAction() {
  return {
    type: UP_VOTE_POST,
  };
}

export function downVotePost(postId) {
  return async dispatch => {
    await ReadableAPI.downVotePost(postId)
    dispatch(downVotePostAction());
  }
}

function downVotePostAction() {
  return {
    type: DOWN_VOTE_POST,
  };
}
