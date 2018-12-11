import { get } from 'lodash';
import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ComponentAdd extends Component {

  render() {
    let { show, comment, handleClose } = this.props

    function FieldGroup({ id, label, ...props }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
        </FormGroup>
      );
    }

    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add your comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FieldGroup
                id='body'
                type='input'
                label='Comment'
                componentClass='textarea'
                style={{ height: 200, resize: 'vertical' }}
                defaultValue={get(comment, 'body')}
                placeholder='Enter comment'
              />
              <FieldGroup
                id='author'
                type='input'
                label='Author'
                defaultValue={get(comment, 'author')}
                placeholder='Enter author'
              />
            </form >
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit'>Submit</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(connect(
  null,
  null,
)(ComponentAdd))
