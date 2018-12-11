import * as ReadableAPI from '../utils/api'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'


export function fetchComments(postId) {
  return async dispatch => {
    let comments = await ReadableAPI.fetchComments(postId);
    dispatch(getComments(comments));
  }
}

function getComments(comments) {
  return {
    type: GET_POST_COMMENTS,
    comments
  };
}
