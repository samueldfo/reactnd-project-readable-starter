import * as moment from 'moment';
import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { downVotePost, removePost, upVotePost } from '../actions/posts.action'

class PostList extends Component {

  handleRemove = (id) => {
    this.props.remove(id)
  }

  handleUpVote = (id) => {
    this.props.upVote(id)
  }

  handleDownVote = (id) => {
    this.props.downVote(id)
  }

  render() {

    let { posts, handleEdit } = this.props

    return (
      <Table striped hover>
        <thead>
          <tr>
            <th width='10%'>Votes</th>
            <th width='10%'>Category</th>
            <th width='40%'>Title</th>
            <th width='10%'>Author</th>
            <th width='5%'>Comments</th>
            <th width='10%'>Created At</th>
            <th width='15%'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post =>
            <tr>
              <td>
                <ButtonGroup>
                  <Button bsSize='xsmall' onClick={() => this.handleUpVote(post.id)} >
                    <Glyphicon glyph='thumbs-up' />
                  </Button>
                  <Button active bsSize='xsmall'>{post.voteScore}</Button>
                  <Button bsSize='xsmall' onClick={() => this.handleDownVote(post.id)} >
                    <Glyphicon glyph='thumbs-down' />
                  </Button>
                </ButtonGroup>
              </td>
              <td>{post.category}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.commentCount}</td>
              <td>{moment(new Date(post.timestamp)).calendar()}</td>
              <td>
                <Button componentClass={Link} href='/' to={`/posts/${post.id}`} bsStyle='link'><Glyphicon glyph='eye-open' /></Button>
                <Button bsStyle='link' onClick={() => handleEdit(post)}><Glyphicon glyph='pencil' /></Button>
                <Button bsStyle='link' onClick={() => this.handleRemove(post.id)}><Glyphicon glyph='trash' /></Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    remove  : (id) => dispatch(removePost(id)),
    upVote  : (id) => dispatch(upVotePost(id)),
    downVote: (id) => dispatch(downVotePost(id)),
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(PostList))

