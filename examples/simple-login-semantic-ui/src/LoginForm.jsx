import React from 'react';

import { NestedForm } from 'formosa';
import { Form, ValidatedInput } from 'formosa-semantic-ui-react';
import { Form as SemanticForm } from 'semantic-ui-react';
import { CustomValidation, notEmpty, alpha, number, noop, success, error } from 'formosa/validations';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmut = this.handleSubmit.bind(this);
    this.state = {
      isValid: false,
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
    console.log('error', error);
    console.log('info', info);
  }

  render() {
    return (
      <SemanticForm
        as={Form}
        onInvalid={() => this.setState({isValid: false})}
        onSubmit={this.handleSubmit}
        onValid={() => this.setState({isValid: true})}
        style={{
          border: '1px solid black',
          margin: '3em',
        }}
      >
        <ValidatedInput
          name="username"
          label="Nombre de usuario"
          validation={notEmpty.and(alpha).withError('Please insert a valid username')}
        /> <br/>
        <NestedForm
          name="password"
          validation={
            new CustomValidation(({value, confirmation}) =>
              value === confirmation ?
                success(value) :
                error(`Passwords don't match`),
            )
          }
          errorsComponent={({errors}) =>
            <div>
              <p>{errors}</p>
              <img src="https://media.giphy.com/media/b5XRfyjS2xva0/giphy.gif"/>
            </div>
          }
        >
          <ValidatedInput
            name="value"
            label="Password"
            validation={notEmpty}
          /> <br/>
          <ValidatedInput
            name="confirmation"
            label="Confirmation"
            validation={noop}
          /> <br/>
        </NestedForm>
        <button
          disabled={!this.state.isValid}
          type='submit'
        > LOGIN
        </button>
      </SemanticForm>
    );
  }
}
