import React, { Component } from 'react';
import * as moment from 'moment';
import { Panel, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class CommentList extends Component {

  render() {

    let { comment, handleShow, handleUpVote, handleDownVote, handleRemove } = this.props

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
              <Button bsSize='xsmall' onClick={() => handleUpVote(comment.id)} >
                <Glyphicon glyph='thumbs-up' />
              </Button>
              <Button active bsSize='xsmall'>{comment.voteScore}</Button>
              <Button bsSize='xsmall' onClick={() => handleDownVote(comment.id)} >
                <Glyphicon glyph='thumbs-down' />
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <Button bsStyle='link' bsSize='xsmall' onClick={() => handleShow(comment)}>
              <Glyphicon glyph='pencil' />
            </Button>
            <Button bsStyle='link'>
              <Glyphicon glyph='trash' bsSize='xsmall' onClick={() => handleRemove(comment.id)} />
            </Button>
          </div>
        </Panel.Footer>
      </Panel >
    );
  }
}

export default withRouter(connect(
  null,
  null,
)(CommentList))

