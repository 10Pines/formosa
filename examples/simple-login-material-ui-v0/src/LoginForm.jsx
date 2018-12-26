import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';

import { NestedForm, validations } from 'formosa';
import { Form, ValidatedTextField, ValidatedToggle, ValidatedButton } from 'formosa-material-ui-v0';
const { CustomValidation, notEmpty, alpha, number, noop, success, error } = validations;

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
      <MuiThemeProvider>
        <Form
          onSubmit={this.handleSubmit}
          style={{
            border: '1px solid black',
            margin: '3em',
          }}
        >
          <ValidatedTextField
            name="username"
            floatingLabelText="Username"
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
              floatingLabelText="Password"
              validation={notEmpty}
            /> <br/>
            <ValidatedTextField
              name="confirmation"
              floatingLabelText="Confirmation"
              validation={noop}
            /> <br/>
          </NestedForm>
          <Toggle
            name="isAdmin"
            onToggle={(evt, shouldShowEmail) => {
              this.setState({shouldShowEmail});
            }}
          />
          {this.state.shouldShowEmail && <ValidatedTextField
            name="email"
            floatingLabelText="Email"
            validation={notEmpty}
          />} <br/>
          <ValidatedButton primary>LOGIN</ValidatedButton>
        </Form>
      </MuiThemeProvider>
    );
  }
}
