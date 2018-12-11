import React from 'react'
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

export default function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}