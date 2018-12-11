import * as moment from 'moment';
import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function PostList({ posts }) {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th width='5%'>Votes</th>
          <th width='10%'>Category</th>
          <th width='45%'>Title</th>
          <th width='10%'>Author</th>
          <th width='5%'>Comments</th>
          <th width='10%'>Created At</th>
          <th width='15%'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post =>
          <tr>
            <td>{post.voteScore}</td>
            <td>{post.category}</td>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{post.commentCount}</td>
            <td>{moment(new Date(post.timestamp)).calendar()}</td>
            <td>
              <Button componentClass={Link} href='/' to={`/posts/${post.id}`} bsStyle='link'><Glyphicon glyph='eye-open' /></Button>
              <Button componentClass={Link} href='/' to={`/posts/${post.id}`} bsStyle='link'><Glyphicon glyph='pencil' /></Button>
              <Button componentClass={Link} href='/' to={`/posts/${post.id}`} bsStyle='link'><Glyphicon glyph='trash' /></Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}
