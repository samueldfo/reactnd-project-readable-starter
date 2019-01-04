
import { filter, orderBy } from 'lodash';
import React, { Component } from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCategories } from '../actions/categories.action';
import { fetchPosts } from '../actions/posts.action';
import { POST_SORT } from '../utils/constants';
import CategoryNav from './category-nav.component';
import PostList from './post-list.component';
import PostForm from './post-form.component';
import { removePost } from '../actions/posts.action';

class Home extends Component {

  state = {
    sortBy: POST_SORT.HIGHEST_SCORE,
    showPostModal: false,
  }

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }

  sort = (sortBy) => {
    this.setState({ sortBy })
  }

  handleShowPostModal = () => {
    this.setState({ showPostModal: true });
  }

  handleRemovePost = (id) => {
    this.props.removePost(id)
  }

  handleEditPost = (post) => {
    this.setState({
      post: post,
      showPostModal: true
    });
  }

  handleClosePostModal = () => {
    this.setState({ showPostModal: false });
  }

  render() {
    let { categories, posts, post } = this.props

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
      <div className='container'>
        <PageHeader>Readable</PageHeader>
        {posts !== null && categories !== null && (
          <div>
            <div className='nav-post'>
              {categories !== null && (<CategoryNav categories={categories} />)}
              <ButtonGroup>
                <Button bsStyle='primary' bsSize='small' onClick={this.handleShowPostModal}>+ New Post</Button>
                <DropdownButton
                  bsSize='small'
                  title='Sort By'
                  onSelect={(e) => this.sort(e)}
                >
                  <MenuItem eventKey={POST_SORT.HIGHEST_SCORE} active={this.state.sortBy === POST_SORT.HIGHEST_SCORE}>Votes: High to Low</MenuItem>
                  <MenuItem eventKey={POST_SORT.LOWEST_SCORE} active={this.state.sortBy === POST_SORT.LOWEST_SCORE}>Votes: Low to High</MenuItem>
                  <MenuItem eventKey={POST_SORT.NEWEST_POSTS} active={this.state.sortBy === POST_SORT.NEWEST_POSTS}>Newest Posts</MenuItem>
                  <MenuItem eventKey={POST_SORT.OLDEST_POSTS} active={this.state.sortBy === POST_SORT.OLDEST_POSTS}>Oldest Posts</MenuItem>
                </DropdownButton>
              </ButtonGroup>
            </div>
            <PostList
              posts={this.props.match.params.categoryPath ? filter(posts, post => post.category === this.props.match.params.categoryPath) : posts}
              handleRemove={this.handleRemovePost}
              handleEdit={this.handleEditPost} />
          </div >)}
        <PostForm
          show={this.state.showPostModal}
          post={this.state.post}
          handleClose={this.handleClosePostModal}>
        </PostForm>
      </div >
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories.items,
    posts: posts.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
    removePost: (id) => dispatch(removePost(id)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home))
