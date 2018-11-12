import React from 'react';

import { NestedForm, validations, Form, ValidatedInput, ValidatedButton } from 'formosa';

const {CustomValidation, notEmpty, alpha, number, noop, success, error} = validations;

export default class LoginForm extends React.Component {
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
    console.log('error', error);
    console.log('info', info);
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
        <label>
          Username:
          <ValidatedInput
            name="username"
            validation={notEmpty.and(alpha).withError('Please insert a valid username')}
          />
        </label> <br/>
        <NestedForm
          name="password"
          validation={
            new CustomValidation(({value, confirmation}) =>
              value === confirmation ?
                success(value) :
                error('Passwords don\'t match'),
            )
          }
          errorsComponent={({errors}) =>
            <div>
              <p>{errors}</p>
              <img src="https://media.giphy.com/media/b5XRfyjS2xva0/giphy.gif"/>
            </div>
          }
        >
          <label>
            Password:
            <ValidatedInput
              name="value"
              validation={notEmpty}
            />
          </label> <br/>

          <label>
            Confirmation:
            <ValidatedInput
              name="confirmation"
              validation={noop}
            />
          </label> <br/>
        </NestedForm>
        <ValidatedButton> LOGIN </ValidatedButton>
      </Form>
    );
  }
}
