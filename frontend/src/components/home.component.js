
import React, { Component } from 'react';
import MainTable from './main-table.component'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCategories } from '../actions/categories.action'
import { fetchPosts } from '../actions/posts.action'
import { PageHeader } from 'react-bootstrap';

class Home extends Component {

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div className='container'>
        <PageHeader>Readable</PageHeader>
        {posts !== null && categories !== null && (<MainTable posts={posts} categories={categories} />)}
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
    fetchPosts: () => dispatch(fetchPosts())
    // deletePost: (data) => dispatch(fetchDeletePost(data)),
    // upVotePost: (data) => dispatch(fetchUpVotePost(data)),
    // downVotePost: (data) => dispatch(fetchDownVotePost(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home))


