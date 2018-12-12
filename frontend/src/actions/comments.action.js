import * as ReadableAPI from '../utils/api'
import { uuidv4 } from '../utils/uuid'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const RELOAD_COMMENTS = 'RELOAD_COMMENTS'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'


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

export function editComment(data) {
  return async dispatch => {
    await ReadableAPI.editComment(
      {
        ...data,
        timestamp: Date.now(),
      }
    );
    dispatch(editCommentAction());
  }
}

function editCommentAction() {
  return {
    type: EDIT_COMMENT,
  };
}

export function removeComment(commentId) {
  return async dispatch => {
    await ReadableAPI.removeComment(commentId)
    dispatch(removeCommentAction());
  }
}

function removeCommentAction() {
  return {
    type: REMOVE_COMMENT,
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

export function upVoteComment(commentId) {
  return async dispatch => {
    await ReadableAPI.upVoteComment(commentId)
    dispatch(upVoteCommentAction());
  }
}

function upVoteCommentAction() {
  return {
    type: UP_VOTE_COMMENT,
  };
}

export function downVoteComment(commentId) {
  return async dispatch => {
    await ReadableAPI.downVoteComment(commentId)
    dispatch(downVoteCommentAction());
  }
}

function downVoteCommentAction() {
  return {
    type: DOWN_VOTE_COMMENT,
  };
}