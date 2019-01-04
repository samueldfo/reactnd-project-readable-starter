import * as ReadableAPI from '../utils/api'
import { uuidv4 } from '../utils/uuid'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
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
    let comment = await ReadableAPI.addComment(
      {
        ...data,
        id: uuidv4(),
        timestamp: Date.now(),
      }
    );
    dispatch(addCommentAction(comment));
  }
}

function addCommentAction(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function editComment(data) {
  return async dispatch => {
    let comment = await ReadableAPI.editComment(
      {
        ...data,
        timestamp: Date.now(),
      }
    );
    dispatch(editCommentAction(comment));
  }
}

function editCommentAction(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  };
}

export function removeComment(commentId) {
  return async dispatch => {
    let comment = await ReadableAPI.removeComment(commentId)
    dispatch(removeCommentAction(comment));
  }
}

function removeCommentAction(comment) {
  return {
    type: REMOVE_COMMENT,
    comment,
  };
}

export function upVoteComment(commentId) {
  return async dispatch => {
    const comment = await ReadableAPI.upVoteComment(commentId)
    dispatch(upVoteCommentAction(comment));
  }
}

function upVoteCommentAction(comment) {
  return {
    type: UP_VOTE_COMMENT,
    comment
  };
}

export function downVoteComment(commentId) {
  return async dispatch => {
    const comment = await ReadableAPI.downVoteComment(commentId)
    dispatch(downVoteCommentAction(comment));
  }
}

function downVoteCommentAction(comment) {
  return {
    type: DOWN_VOTE_COMMENT,
    comment
  };
}