import { GET_COMMENTS, ADD_COMMENT, RELOAD_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT } from '../actions';

const commentsInitialState = {
  items: null,
  loading: true
}

export function comments(state = commentsInitialState, action) {
  const { comments, type } = action
  switch (type) {
    case RELOAD_COMMENTS:
    case GET_COMMENTS:
      return {
        ...state,
        items: comments,
        loading: false,
      }
    default:
      return state
  }
}

const commentInitialState = {
  items: null,
  loading: true
}

export function comment(state = commentInitialState, action) {
  const { type } = action
  switch (type) {
    case UP_VOTE_COMMENT:
    case DOWN_VOTE_COMMENT:
    case ADD_COMMENT:
    case EDIT_COMMENT:
    case REMOVE_COMMENT:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}