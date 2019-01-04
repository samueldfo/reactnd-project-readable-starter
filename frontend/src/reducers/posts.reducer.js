import { SET_POSTS, GET_POST_DETAIL, UP_VOTE_POST, DOWN_VOTE_POST, ADD_POST, EDIT_POST, REMOVE_POST } from '../actions'

const postsInitialState = {
  items: [],
}

export function posts(state = postsInitialState, action) {
  const { posts, type, post } = action
  switch (type) {
    case SET_POSTS:
      return {
        ...state,
        items: posts,
      }
    case REMOVE_POST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== post.id)
      }
    case ADD_POST:
      return {
        ...state,
        items: [...state.items, post]
      }
    case EDIT_POST:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === post.id) {
            item = post
          }
          return item;
        }),
      }
    default:
      return state
  }
}

const postInitialState = {
  details: null,
}

export function post(state = postInitialState, action) {
  const { details, type, post } = action
  switch (type) {
    case UP_VOTE_POST:
      return {
        ...state,
        details: {
          ...state.details,
          voteScore: post.voteScore
        }
      }
    case DOWN_VOTE_POST:
      return {
        ...state,
        details: {
          ...state.details,
          voteScore: post.voteScore
        }
      }
    case EDIT_POST:
      return {
        ...state,
        details: post,
      }
    case GET_POST_DETAIL:
      return {
        ...state,
        details,
      }
    default:
      return state
  }
}
