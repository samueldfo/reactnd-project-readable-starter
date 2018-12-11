import { SET_POSTS, GET_POST_DETAIL } from '../actions'

const postsInitialState = {
  items: [],
  loading: true
}

export function posts(state = postsInitialState, action) {
  const { posts, type } = action
  switch (type) {
    case SET_POSTS:
      return {
        ...state,
        items: posts,
        loading: false,
      }
    default:
      return state
  }
}

const postInitialState = {
  details: null,
  comments: null,
  loading: true
}

export function post(state = postInitialState, action) {
  const { details, type } = action
  switch (type) {
    case GET_POST_DETAIL:
      return {
        ...state,
        details,
        loading: false,
      }
    default:
      return state
  }
}