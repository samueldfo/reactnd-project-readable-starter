import * as ReadableAPI from '../utils/api'

export const SET_POSTS = 'SET_POSTS'

export function fetchPosts() {
  return async dispatch => {
    let posts = await ReadableAPI.fetchPosts();
    dispatch(setPosts(posts));
  }

  function setPosts(posts) {
    return {
      type: SET_POSTS,
      posts
    };
  }

}