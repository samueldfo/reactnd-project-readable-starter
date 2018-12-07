import { SET_CATEGORIES, } from '../actions'

const initialState = {
  items: [],
  loading: true
}

export function categories(state = initialState, action) {
  const { categories, type } = action
  switch (type) {
    case SET_CATEGORIES:
      return {
        ...state,
        items: categories,
        loading: false,
      }
    default:
      return state
  }
}