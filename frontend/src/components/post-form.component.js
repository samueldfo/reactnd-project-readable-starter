import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPost, editPost } from '../actions/posts.action';
import FieldGroup from './field-group.component';
import { isEmpty, get } from 'lodash'

class PostForm extends Component {

  state = {
    author: '',
    body: '',
    category: '',
    title: '',
    aError: false,
    bError: false,
    tError: false,
    cError: false,
  }

  handleSubmit = () => {
    if (isEmpty(this.state.author) || isEmpty(this.state.body) || isEmpty(this.state.category) || isEmpty(this.state.title)) {
      this.setState({
        ...this.state,
        aError: isEmpty(this.state.author),
        bError: isEmpty(this.state.body),
        cError: isEmpty(this.state.category),
        tError: isEmpty(this.state.title),
      })
    }
    if (!isEmpty(this.state.author) && !isEmpty(this.state.body) && !isEmpty(this.state.category) && !isEmpty(this.state.title)) {
      const post = {
        ...this.props.post,
        body: isEmpty(this.state.body) ? this.props.post.body : this.state.body,
        author: isEmpty(this.state.author) ? this.props.post.author : this.state.author,
        category: isEmpty(this.state.category) ? this.props.post.category : this.state.category,
        title: isEmpty(this.state.title) ? this.props.post.title : this.state.title,
      }
      get(post, 'id') ? this.props.editPost(post) : this.props.addPost(post)
      this.clearForm()
      this.props.handleClose()
    }
  }

  handleClose = () => {
    this.clearForm()
    this.props.handleClose()
  }

  clearForm = () => {
    this.setState({
      body: '',
      author: '',
      category: '',
      title: '',
    })
  }

  handleBodyChange = (e) => { this.setState({ ...this.state, body: e.target.value, bError: false }) }
  handleAuthorChange = (e) => { this.setState({ ...this.state, author: e.target.value, aError: false }) }
  handleCategoryChange = (e) => { this.setState({ ...this.state, category: e.target.value, cError: false }) }
  handleTitleChange = (e) => { this.setState({ ...this.state, title: e.target.value, tError: false }) }

  render() {

    let { show, post, handleClose } = this.props

    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{get(post, 'id') ? 'Edit your post' : 'Add your post'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
              <FieldGroup
                id='title'
                type='input'
                vState={this.state.tError ? 'error' : null}
                label='Title'
                defaultValue={get(post, 'id') ? post.title : this.state.title}
                onChange={this.handleTitleChange}
                placeholder='Enter title'
              />
              <FieldGroup
                id='category'
                type='input'
                vState={this.state.cError ? 'error' : null}
                label='Category'
                defaultValue={get(post, 'id') ? post.category : this.state.category}
                onChange={this.handleCategoryChange}
                placeholder='Enter category'
              />
              <FieldGroup
                id='body'
                type='input'
                vState={this.state.bError ? 'error' : null}
                label='Post'
                componentClass='textarea'
                style={{ resize: 'vertical' }}
                rows='10'
                defaultValue={get(post, 'id') ? post.body : this.state.body}
                onChange={this.handleBodyChange}
                placeholder='Enter post'
              />
              <FieldGroup
                id='author'
                type='input'
                vState={this.state.aError ? 'error' : null}
                label='Author'
                defaultValue={get(post, 'id') ? post.author : this.state.author}
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
    addPost: (post) => dispatch(addPost(post)),
    editPost: (post) => dispatch(editPost(post)),
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(PostForm))
