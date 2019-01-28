import React from 'react';

import { Form, ValidatedInput, ValidatedButton, validations } from 'formosa';
const { notEmpty, alpha, noop } = validations;

const LoginForm = () => (
  <Form
    onSubmit={(loginData) => {
      alert(JSON.stringify(loginData, null, 2));
    }}
  >
    Username:
    <ValidatedInput
      name="username"
      validation={notEmpty.then(alpha).withError('Invalid!!!')}
    /> <br/>
    Password:
    <ValidatedInput
      name="password"
      type="password"
    /> <br/>
    <ValidatedButton>LOGIN</ValidatedButton> <br/>
  </Form>
)

export default LoginForm;
