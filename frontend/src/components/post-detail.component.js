import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchPostDetail } from '../actions/posts.action';
import { get } from 'lodash';
import * as moment from 'moment';

class PostDetail extends Component {

  componentDidMount() {
    this.props.fetchPostDetail(this.props.match.params.postId)
  }

  render() {

    const { post } = this.props

    function FieldGroup({ id, label, ...props }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
        </FormGroup>
      );
    }

    return (
      <div className='container' >
        <form>
          <FieldGroup
            id='category'
            type='input'
            label='Category'
            value={get(post, 'category')}
            disabled
          />
          <FieldGroup
            id='title'
            type='input'
            label='Title'
            value={get(post, 'title')}
            disabled
          />
          <FieldGroup
            id='body'
            type='input'
            label='Post'
            value={get(post, 'body')}
            disabled
          />
          <FieldGroup
            id='author'
            type='input'
            label='Author'
            value={get(post, 'author')}
            disabled
          />
          <FieldGroup
            id='date created'
            type='input'
            label='Date Created'
            value={post ? moment(new Date(post.timestamp)).calendar() : null}
            disabled
          />
          <FieldGroup
            id='votes'
            type='input'
            label='Votes'
            value={get(post, 'voteScore')}
            disabled
          />
        </form >
      </div>
    )
  }

}

function mapStateToProps({ post }) {
  return {
    post: post.details
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostDetail: (postId) => dispatch(fetchPostDetail(postId)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail))
