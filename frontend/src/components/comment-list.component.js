import React, { Component } from 'react';
import * as moment from 'moment';
import { Panel, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeComment, upVoteComment, downVoteComment } from '../actions/comments.action';

class CommentList extends Component {

  handleRemove = () => {
    this.props.removeComment(this.props.comment.id).then(() => this.props.reloadComments())
  }

  handleUpVote = () => {
    this.props.upVoteComment(this.props.comment.id).then(() => this.props.reloadComments())
  }

  handleDownVote = () => {
    this.props.downVoteComment(this.props.comment.id).then(() => this.props.reloadComments())
  }

  render() {

    let { comment, handleShow } = this.props

    return (
      <Panel eventKey={comment.id}>
        <Panel.Heading className='nav-post'>
          <p>{comment.author}</p>
          <p>{moment(new Date(comment.timestamp)).calendar()}</p>
        </Panel.Heading>
        <Panel.Body>
          {comment.body}
        </Panel.Body>
        <Panel.Footer className='nav-post'>
          <div>
            <ButtonGroup>
              <Button bsSize='xsmall' onClick={() => this.handleUpVote(comment)} >
                <Glyphicon glyph='thumbs-up' />
              </Button>
              <Button active bsSize='xsmall'>{comment.voteScore}</Button>
              <Button bsSize='xsmall' onClick={() => this.handleDownVote(comment)} >
                <Glyphicon glyph='thumbs-down' />
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <Button bsStyle='link' bsSize='xsmall' onClick={() => handleShow(comment)}>
              <Glyphicon glyph='pencil' />
            </Button>
            <Button bsStyle='link'>
              <Glyphicon glyph='trash' bsSize='xsmall' onClick={() => this.handleRemove()} />
            </Button>
          </div>
        </Panel.Footer>
      </Panel >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeComment: (commentId) => dispatch(removeComment(commentId)),
    upVoteComment: (commentId) => dispatch(upVoteComment(commentId)),
    downVoteComment: (commentId) => dispatch(downVoteComment(commentId)),
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(CommentList))

