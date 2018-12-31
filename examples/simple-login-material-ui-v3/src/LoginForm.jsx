import React from 'react';

import { NestedForm, validations } from 'formosa';
import { Form, ValidatedTextField, ValidatedToggle, ValidatedButton } from 'formosa-material-ui-v3';
const { CustomValidation, notEmpty, alpha, number, noop, success, error } = validations;

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmut = this.handleSubmit.bind(this);
    this.state = {
      shouldShowEmail: false,
    };
  }

  handleSubmit(loginData) {
    /*
    Do whatever you want to do here.

    The object will follow the form's structure so
    loginData will be an object with 'username' and 
    'password' properties, eg:

    {
      username: 'ludat',
      password: 'super secret'
    }
    */
    console.log(loginData);
  }

  componentDidCatch(error, info) {
    console.error('error', error);
    console.warn('info', info);
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{
          border: '1px solid black',
          margin: '3em',
        }}
      >
        <ValidatedTextField
          name="username"
          label="Username"
          validation={notEmpty.and(alpha).withError('Please insert a valid username')}
        /> <br/>
        <NestedForm
          name="password"
          validation={
            new CustomValidation(({value, confirmation}) =>
              value === confirmation ?
                success(value) :
                error("Passwords don't match"),
            )
          }
          errorsComponent={({errors}) =>
            <div>
              <p>{errors}</p>
              <img src="https://media.giphy.com/media/b5XRfyjS2xva0/giphy.gif"/>
            </div>
          }
        >
          <ValidatedTextField
            name="value"
            label="Password"
            validation={notEmpty}
          /> <br/>
          <ValidatedTextField
            name="confirmation"
            label="Confirmation"
            validation={noop}
          /> <br/>
        </NestedForm>
        <ValidatedButton color="primary">LOGIN</ValidatedButton>
      </Form>
    );
  }
}
