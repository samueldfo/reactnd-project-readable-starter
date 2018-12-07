import * as moment from 'moment';
import React from 'react';
import { Table } from 'react-bootstrap';


export default function PostList({ posts }) {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Votes</th>
          <th>Category</th>
          <th>Title</th>
          <th>Post</th>
          <th>Author</th>
          <th>Comments</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post =>
          <tr>
            <td>{post.voteScore}</td>
            <td>{post.category}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
            <td>{post.author}</td>
            <td>{post.commentCount}</td>
            <td>{moment(new Date(post.timestamp)).calendar()}</td>
          </tr>)}
      </tbody>
    </Table>
  )
}

