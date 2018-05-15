import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Form, ValidatedTextField, ValidatedToggle } from 'formines-material-ui';
import { notEmpty, alpha, number, noop } from 'formines/validations';


export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmut = this.handleSubmit.bind(this);
    this.state = { isValid: false };
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
    console.log(loginData)
  }
  componentDidCatch(error, info) {
    console.log('error', error);
    console.log('info', info);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Form
          onInvalid={() => this.setState({ isValid: false })}
          onSubmit={this.handleSubmit}
          onValid={() => this.setState({ isValid: true })}
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            width: '500px',
            textAlign: 'center',
          }}
        >
          <ValidatedTextField
            name="username"
            floatingLabelText="Usename"
            validation={notEmpty.and(alpha).withError("Please insert a valid username")}
          />
          <ValidatedTextField
            name="password"
            floatingLabelText="Password"
            validation={notEmpty}
          />
          <ValidatedToggle
            label="Toggled by default"
            name="isAdmin"
            validation={noop}
          />
          <button
            disabled={!this.state.isValid}
            type='submit'
          > LOGIN </button>
        </Form>
      </MuiThemeProvider>
    );
  }
}
