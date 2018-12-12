import { get, orderBy } from 'lodash';
import * as moment from 'moment';
import React, { Component } from 'react';
import { Button, Glyphicon, Label, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchComments, reloadComments } from '../actions/comments.action';
import { upVotePost, downVotePost } from '../actions/posts.action';
import { fetchPostDetail, removePost } from '../actions/posts.action';
import CommentForm from './comment-form.component';
import PostForm from './post-form.component';
import CommentList from './comment-list.component';

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
    this.reloadComments()
  }

  reloadComments = () => {
    this.props.reloadComments(this.props.post.id)
  }

  handleShowPostModal = () => {
    this.setState({
      showPostModal: true
    });
  }

  handleClosePostModal = () => {
    this.setState({ showPostModal: false });
    this.props.fetchPostDetail(this.props.match.params.postId)
  }

  handleUpVote = () => {
    this.props.upVotePost(this.props.post.id).then(this.props.fetchPostDetail(this.props.post.id))
  }

  handleDownVote = () => {
    this.props.downVotePost(this.props.post.id).then(this.props.fetchPostDetail(this.props.post.id))
  }

  handleRemove = () => {
    this.props.removePost(this.props.post.id) && this.props.history.goBack()
  }

  render() {

    let { post, comments } = this.props

    comments = comments.filter(comment => !comment.deleted)
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
            <ButtonGroup>
              <Button bsSize='xsmall' onClick={() => this.handleUpVote(post)} >
                <Glyphicon glyph='thumbs-up' />
              </Button>
              <Button active bsSize='xsmall'>{get(post, 'voteScore')}</Button>
              <Button bsSize='xsmall' onClick={() => this.handleDownVote(post)} >
                <Glyphicon glyph='thumbs-down' />
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <Button bsStyle='link' >
              <Glyphicon glyph='pencil' onClick={this.handleShowPostModal} />
            </Button>
            <Button bsStyle='link'>
              <Glyphicon glyph='trash' onClick={this.handleRemove} />
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
        {comments.map(comment =>
          <CommentList
            comment={comment}
            handleShow={this.handleShowCommentModal}
            reloadComments={this.reloadComments}
          />)}
          <CommentForm
          show={this.state.showCommentModal}
          comment={this.state.selectedComment}
          post={this.props.post}
          handleClose={this.handleCloseCommentModal}>
        </CommentForm>
        <PostForm
          show={this.state.showPostModal}
          post={this.props.post}
          handleClose={this.handleClosePostModal}>
        </PostForm>
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
    removePost: (postId) => dispatch(removePost(postId)),
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    reloadComments: (postId) => dispatch(reloadComments(postId)),
    upVotePost: (commentId) => dispatch(upVotePost(commentId)),
    downVotePost: (commentId) => dispatch(downVotePost(commentId)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post))
