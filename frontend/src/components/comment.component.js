import * as moment from 'moment';
import React from 'react';
import { Panel, Button, Glyphicon } from 'react-bootstrap';

export default function CommentList({ comment, handleShow }) {
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
          <Button bsSize='xsmall'>
            <Glyphicon glyph='thumbs-up' /> {comment.voteScore > 0 ? comment.voteScore : 0}
          </Button>
          <Button bsSize='xsmall'>
            <Glyphicon glyph='thumbs-down' /> {comment.voteScore < 0 ? comment.voteScore : 0}
          </Button>
        </div>
        <div>
          <Button bsStyle='link' bsSize='xsmall' onClick={() => handleShow(comment)}>
            <Glyphicon glyph='pencil' />
          </Button>
          <Button bsStyle='link'>
            <Glyphicon glyph='trash' bsSize='xsmall' />
          </Button>
        </div>
      </Panel.Footer>
    </Panel >
  )
}
