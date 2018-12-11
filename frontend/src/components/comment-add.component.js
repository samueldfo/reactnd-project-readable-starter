import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addComment, reloadComments } from '../actions/comments.action';
import FieldGroup from './field-group.component';

class ComponentAdd extends Component {

  state = {
    editMode: false,
    // editingComment: {},
    author: '',
    body: '',
  }

  handleSubmit = () => {
    const comment = {
      ...this.props.comment,
      parentId: this.props.post.id,
      body: this.state.body,
      author: this.state.author,
    }
    this.props.addComment(comment)
    this.props.reloadComments(this.props.post.id)
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
      body: e.target.value
    })
  }

  handleAuthorChange = (e) => {
    this.setState({
      author: e.target.value
    })
  }

  render() {

    let { show, handleClose } = this.props

    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add your comment</Modal.Title>
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
                value={this.state.body}
                onChange={this.handleBodyChange}
                placeholder='Enter comment'
              />
              <FieldGroup
                id='author'
                type='input'
                label='Author'
                value={this.state.author}
                onChange={this.handleAuthorChange}
                placeholder='Enter author'
              // disabled={this.state.editMode}
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
    reloadComments: (postId) => dispatch(reloadComments(postId))
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(ComponentAdd))
