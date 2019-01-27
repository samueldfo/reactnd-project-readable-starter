import * as ReadableAPI from '../utils/api'
import { uuidv4 } from '../utils/uuid'

export const SET_POSTS = 'SET_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
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

export function fetchPostDetail(id) {
  return async dispatch => {
    let details = await ReadableAPI.fetchPostDetail(id);
    dispatch(getPostDetail(details));
  }
}

function getPostDetail(details) {
  return {
    type: GET_POST_DETAIL,
    details
  };
}

export function addPost(data) {
  return async dispatch => {
    let post = await ReadableAPI.addPost(
      {
        ...data,
        id: uuidv4(),
        timestamp: Date.now(),
      }
    );
    dispatch(addPostAction(post));
  }
}

function addPostAction(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function editPost(data) {
  return async dispatch => {
    let post = await ReadableAPI.editPost(
      {
        ...data,
        timestamp: Date.now(),
      }
    );
    dispatch(editPostAction(post));
  }
}

function editPostAction(post) {
  return {
    type: EDIT_POST,
    post
  };
}

export function removePost(id) {
  return async dispatch => {
    let post = await ReadableAPI.removePost(id)
    dispatch(removePostAction(post));
  }
}

function removePostAction(post) {
  return {
    type: REMOVE_POST,
    post
  };
}

export function upVotePost(id) {
  return async dispatch => {
    let post = await ReadableAPI.upVotePost(id)
    dispatch(upVotePostAction(post));
  }
}

function upVotePostAction(post) {
  return {
    type: UP_VOTE_POST,
    post,
  };
}

export function downVotePost(id) {
  return async dispatch => {
    let post = await ReadableAPI.downVotePost(id)
    dispatch(downVotePostAction(post));
  }
}

function downVotePostAction(post) {
  return {
    type: DOWN_VOTE_POST,
    post,
  };
}
