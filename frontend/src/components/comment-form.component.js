import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addComment, editComment } from '../actions/comments.action';
import FieldGroup from './field-group.component';
import { isEmpty } from 'lodash'

class CommentForm extends Component {

  state = {
    author: '',
    body: '',
  }

  handleSubmit = () => {
    const comment = {
      ...this.props.comment,
      parentId: this.props.post.id,
      body: isEmpty(this.state.body) ? this.props.comment.body : this.state.body,
      author: isEmpty(this.state.author) ? this.props.comment.author : this.state.author,
    }
    comment.id ? this.props.editComment(comment) : this.props.addComment(comment)
    this.clearForm()
    this.props.handleClose()
  }

  handleClose = () => {
    this.clearForm()
    this.props.handleClose()
  }

  clearForm = () => {
    this.setState({
      body: '',
      author: ''
    })
  }

  handleBodyChange = (e) => {
    this.setState({
      ...this.state,
      body: e.target.value
    })
  }

  handleAuthorChange = (e) => {
    this.setState({
      ...this.state,
      author: e.target.value
    })
  }

  render() {

    let { show, comment, handleClose } = this.props

    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{comment.id ? 'Edit your comment' : 'Add your comment'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
              <FieldGroup
                id='body'
                type='input'
                label='Comment'
                componentClass='textarea'
                style={{ resize: 'vertical' }}
                rows='10'
                defaultValue={comment.id ? comment.body : this.state.body}
                onChange={this.handleBodyChange}
                placeholder='Enter comment'
              />
              <FieldGroup
                id='author'
                type='input'
                label='Author'
                defaultValue={comment.id ? comment.author : this.state.author}
                onChange={this.handleAuthorChange}
                placeholder='Enter author'
              />
            </form >
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' onClick={() => this.handleSubmit()}>Submit</Button>
            <Button onClick={() => this.handleClose()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(addComment(comment)),
    editComment: (comment) => dispatch(editComment(comment)),
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(CommentForm))
