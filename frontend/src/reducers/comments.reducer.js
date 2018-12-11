import { GET_POST_COMMENTS } from '../actions';

const commentsInitialState = {
  items: null,
  loading: true
}

export function comments(state = commentsInitialState, action) {
  const { comments, type } = action
  switch (type) {
    case GET_POST_COMMENTS:
      return {
        ...state,
        items: comments,
        loading: false,
      }
    default:
      return state
  }
}