import * as moment from 'moment';
import React from 'react';
import { Table, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function PostList({ posts, handleRemove, handleEdit, handleUpVote, handleDownVote }) {

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
                <Button bsSize='xsmall' onClick={() => handleUpVote(post.id)} >
                  <Glyphicon glyph='thumbs-up' />
                </Button>
                <Button active bsSize='xsmall'>{post.voteScore}</Button>
                <Button bsSize='xsmall' onClick={() => handleDownVote(post.id)} >
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
              <Button bsStyle='link' onClick={() => handleRemove(post.id)}><Glyphicon glyph='trash' /></Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}
