import { SET_POSTS } from '../actions'

const initialState = {
  items: [],
  loading: true
}

export function posts(state = initialState, action) {
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