import React from 'react';
import { Form, NestedForm, ValidatedInput, ValidatedSelect, ValidatedButton, connectField, validations } from 'formosa';

export class BasicFormosaForm extends React.Component {
  render() {
    return (
      <Form onSubmit={o => alert(JSON.stringify(o))}>
        username
        <ValidatedInput
          name="username"
          validation={
            validations.notEmpty.withError('no puede estar vacio wacho')
              .then(validations.alpha.withError('tiene que ser solo letras'))
          }
        /> <br />
        password
        <ValidatedInput name="password" validation={validations.noop} /> <br />
        <ValidatedButton>submit</ValidatedButton>
      </Form>
    );
  }
}
