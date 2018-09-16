import React from 'react';
import { Form, NestedForm, ValidatedInput, ValidatedSelect, ValidatedButton, connectField, validations } from 'formosa';

export class FormosaFormWithEdad extends React.Component {
  render() {
    return (
      <Form onSubmit={o => alert(JSON.stringify(o))}>
        username
        <ValidatedInput
          name="username"
          validation={validations.noop}
        /><br />
        password
        <ValidatedInput
          name="password"
          validation={validations.noop}
        /><br />
        edad
        <ValidatedInput
          name="age"
          validation={validations.number}
        /><br />
        <ValidatedButton>submit</ValidatedButton>
      </Form>
    );
  }
}
