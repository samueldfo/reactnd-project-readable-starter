import React from 'react'
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap'

export default function FieldGroup({ id, label, vState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={vState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      <HelpBlock>{vState === 'error' ? 'This field is required' : null}</HelpBlock>
    </FormGroup>
  );
}