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

export function addPost(data) {
  return async dispatch => {
    await ReadableAPI.addPost(
      {
        ...data,
        id: uuidv4(),
        timestamp: Date.now(),
      }
    );
    dispatch(addPostAction());
  }
}

function addPostAction() {
  return {
    type: ADD_POST,
  };
}

export function editPost(data) {
  return async dispatch => {
    await ReadableAPI.editPost(
      {
        ...data,
        timestamp: Date.now(),
      }
    );
    dispatch(editPostAction());
  }
}

function editPostAction() {
  return {
    type: EDIT_POST,
  };
}

export function removePost(postId) {
  return async dispatch => {
    await ReadableAPI.removePost(postId)
    dispatch(removePostAction());
  }
}

function removePostAction() {
  return {
    type: REMOVE_POST,
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
