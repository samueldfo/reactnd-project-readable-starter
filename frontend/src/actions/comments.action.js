import * as ReadableAPI from '../utils/api'
import { uuidv4 } from '../utils/uuid'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RELOAD_COMMENTS = 'RELOAD_COMMENTS'


export function fetchComments(postId) {
  return async dispatch => {
    let comments = await ReadableAPI.fetchComments(postId);
    dispatch(getComments(comments));
  }
}

function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  };
}

export function addComment(data) {
  return async dispatch => {
    await ReadableAPI.addComment(
      {
        ...data,
        id: uuidv4(),
        timestamp: Date.now(),
      }
    );
    dispatch(addCommentAction());
  }
}

function addCommentAction() {
  return {
    type: ADD_COMMENT,
  };
}

export function reloadComments(postId) {
  return async dispatch => {
    let comments = await ReadableAPI.fetchComments(postId);
    dispatch(reloadCommentsAction(comments));
  }
}

function reloadCommentsAction(comments) {
  return {
    type: RELOAD_COMMENTS,
    comments
  };
}