import { orderBy } from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { POST_SORT } from '../utils/constants';
import CategoryNav from './category-nav.component';
import PostButtons from './post-buttons.component';
import PostList from './post-list.component';

class MainTable extends Component {

  state = {
    sortBy: POST_SORT.HIGHEST_SCORE,
  }

  sort = (sortBy) => {
    this.setState({ sortBy })
  }

  render() {

    let { posts, categories } = this.props

    switch (this.state.sortBy) {
      case POST_SORT.HIGHEST_SCORE:
        posts = orderBy(posts, 'voteScore', 'desc')
        break
      case POST_SORT.LOWEST_SCORE:
        posts = orderBy(posts, 'voteScore', 'asc')
        break
      case POST_SORT.NEWEST_POSTS:
        posts = orderBy(posts, 'timestamp', 'desc')
        break
      case POST_SORT.OLDEST_POSTS:
        posts = orderBy(posts, 'timestamp', 'asc')
        break
      default:
        break
    }

    return (
      <div>
        <div className='nav-post'>
          {categories !== null && (<CategoryNav categories={categories} />)}
          <PostButtons sortBy={this.state.sortBy} sort={this.sort} />
        </div>
        <PostList posts={posts} />
      </div >
    )
  }

}

export default withRouter(MainTable)