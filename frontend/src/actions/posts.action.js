import * as ReadableAPI from '../utils/api'

export const SET_POSTS = 'SET_POSTS'
export const GET_POST_DETAIL = 'GET_POST_DETAIL'


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
