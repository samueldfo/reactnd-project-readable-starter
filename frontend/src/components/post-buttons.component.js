import React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { POST_SORT } from '../utils/constants';

export default function PostButtons({ sortBy, sort }) {
  return (
    <ButtonGroup>
      <Button bsStyle='primary'>+ New Post</Button>
      <DropdownButton
        title='Sort By'
        onSelect={sort}
      >
        <MenuItem eventKey={POST_SORT.HIGHEST_SCORE} active={sortBy === POST_SORT.HIGHEST_SCORE}>Votes: High to Low</MenuItem>
        <MenuItem eventKey={POST_SORT.LOWEST_SCORE} active={sortBy === POST_SORT.LOWEST_SCORE}>Votes: Low to High</MenuItem>
        <MenuItem eventKey={POST_SORT.NEWEST_POSTS} active={sortBy === POST_SORT.NEWEST_POSTS}>Newest Posts</MenuItem>
        <MenuItem eventKey={POST_SORT.OLDEST_POSTS} active={sortBy === POST_SORT.OLDEST_POSTS}>Oldest Posts</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  )
}
