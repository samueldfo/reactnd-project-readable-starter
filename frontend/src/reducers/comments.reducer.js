import { GET_COMMENTS, ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT } from '../actions';

const commentInitialState = {
  items: null,
}

export function comments(state = commentInitialState, action) {
  const { type, comment, comments } = action
  switch (type) {
    case ADD_COMMENT:
      return {
        ...state,
        items: [...state.items, comment]
      }
    case EDIT_COMMENT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === comment.id) {
            item = comment
          }
          return item;
        }),
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        items: state.items.filter(item => item.id !== comment.id)
      }
    case UP_VOTE_COMMENT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === comment.id) {
            item.voteScore = comment.voteScore
          }
          return item;
        }),
      }
    case DOWN_VOTE_COMMENT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === comment.id) {
            item.voteScore = comment.voteScore
          }
          return item;
        }),
      }
    case GET_COMMENTS:
      return {
        ...state,
        items: comments,
      }
    default:
      return state
  }
}