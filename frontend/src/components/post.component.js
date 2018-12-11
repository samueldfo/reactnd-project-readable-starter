import { get, orderBy } from 'lodash';
import * as moment from 'moment';
import React, { Component } from 'react';
import { Button, Glyphicon, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchComments } from '../actions/comments.action';
import { fetchPostDetail } from '../actions/posts.action';
import ComponentAdd from './comment-add.component';
import CommentList from './comment.component';

class Post extends Component {

  state = {
    showCommentModal: false,
    selectedComment: {},
  }

  componentDidMount() {
    this.props.fetchPostDetail(this.props.match.params.postId)
    this.props.fetchComments(this.props.match.params.postId)
  }

  handleShowCommentModal = (comment) => {
    this.setState({
      selectedComment: comment.id ? comment : {},
      showCommentModal: true
    });
  }

  handleCloseCommentModal = () => {
    this.setState({ showCommentModal: false });
  }

  // handleSubmitCommentModal = () => {
  //   this.setState({ showCommentModal: false });
  //   this.props.fetchComments(this.props.match.params.postId)
  // }

  render() {

    let { post, comments } = this.props

    comments = orderBy(comments, 'voteScore', 'desc')

    return (
      <div className='container' >
        <div className='nav-post-detail'>
          <div>
            <h1>
              {get(post, 'title')} <small> by {get(post, 'author')}</small>
            </h1>
          </div >
          <div>
            <p align='right' >
              <font size='2'>created at {post ? moment(new Date(post.timestamp)).calendar() : null} </font>
            </p>
          </div>
        </div>
        <div className='nav-post'>
          <div>
            <Button bsSize='xsmall'>
              <Glyphicon glyph='thumbs-up' /> {get(post, 'voteScore') > 0 ? get(post, 'voteScore') : 0}
            </Button>
            <Button bsSize='xsmall'>
              <Glyphicon glyph='thumbs-down' /> {get(post, 'voteScore') < 0 ? get(post, 'voteScore') : 0}
            </Button>
          </div>
          <div>
            <Button bsStyle='link' >
              <Glyphicon glyph='pencil' />
            </Button>
            <Button bsStyle='link'>
              <Glyphicon glyph='trash' />
            </Button>
          </div>
        </div>
        <div className='nav-post'>
          <h5>
            <Label>{get(post, 'category')}</Label>
          </h5>
        </div>
        <p>
          {get(post, 'body')}
        </p>
        <hr />
        <div className='nav-post'>
          <h4>Comments</h4>
          <div>
            <Button bsStyle='primary' bsSize='small' onClick={this.handleShowCommentModal}>+ New Comment</Button>
          </div>
        </div>
        <br />
        <ComponentAdd
          show={this.state.showCommentModal}
          comment={this.state.selectedComment}
          post={this.props.post}
          handleClose={this.handleCloseCommentModal}>
        </ComponentAdd>
        {comments.map(comment =>
          <CommentList
            comment={comment}
            handleShow={this.handleShowCommentModal}
          />)}
      </div >
    )
  }

}

function mapStateToProps({ post, comments }) {
  return {
    post: post.details,
    comments: comments.items || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostDetail: (postId) => dispatch(fetchPostDetail(postId)),
    fetchComments: (postId) => dispatch(fetchComments(postId)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post))
