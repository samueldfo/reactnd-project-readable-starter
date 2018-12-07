import * as ReadableAPI from '../utils/api'

export const SET_CATEGORIES = 'SET_CATEGORIES'

export function fetchCategories() {
  return async dispatch => {
    let categories = await ReadableAPI.fetchCategories();
    dispatch(setCategories(categories));
  }

  function setCategories(categories) {
    return {
      type: SET_CATEGORIES,
      categories,
    };
  }

}