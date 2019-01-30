import * as moment from 'moment';
import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { downVoteComment, removeComment, upVoteComment } from '../actions/comments.action';

class CommentList extends Component {

  handleUpVote = (id) => {
    this.props.upVote(id)
  }

  handleDownVote = (id) => {
    this.props.downVote(id)
  }

  handleRemove = (id) => {
    this.props.remove(id)
  }

  render() {

    let { timestamp, id, author, body, voteScore } = this.props.comment

    return (
      <Panel eventKey={id}>
        <Panel.Heading className='nav-post'>
          <p>{author}</p>
          <p>{moment(new Date(timestamp)).calendar()}</p>
        </Panel.Heading>
        <Panel.Body>
          {body}
        </Panel.Body>
        <Panel.Footer className='nav-post'>
          <div>
            <ButtonGroup>
              <Button bsSize='xsmall' onClick={() => this.handleUpVote(id)} >
                <Glyphicon glyph='thumbs-up' />
              </Button>
              <Button active bsSize='xsmall'>{voteScore}</Button>
              <Button bsSize='xsmall' onClick={() => this.handleDownVote(id)} >
                <Glyphicon glyph='thumbs-down' />
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <Button bsStyle='link' bsSize='xsmall' onClick={() => this.props.handleShow(this.props.comment)}>
              <Glyphicon glyph='pencil' />
            </Button>
            <Button bsStyle='link'>
              <Glyphicon glyph='trash' bsSize='xsmall' onClick={() => this.handleRemove(id)} />
            </Button>
          </div>
        </Panel.Footer>
      </Panel >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    remove  : (id) => dispatch(removeComment(id)),
    upVote  : (id) => dispatch(upVoteComment(id)),
    downVote: (id) => dispatch(downVoteComment(id)),
  }
}


export default withRouter(connect(
  null,
  mapDispatchToProps,
)(CommentList))

