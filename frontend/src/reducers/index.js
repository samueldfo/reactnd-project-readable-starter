import { combineReducers } from 'redux';
import { categories } from './categories.reducer';
import { posts, post } from './posts.reducer';
import { comments } from './comments.reducer';

export default combineReducers({ 
  categories,
  posts,
  post,
  comments,
})