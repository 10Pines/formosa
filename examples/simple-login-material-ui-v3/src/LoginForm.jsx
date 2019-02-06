import React from 'react';

import { NestedForm, validations } from 'formosa';
import { Form, ValidatedTextField, ValidatedSwitch, ValidatedButton, ValidatedSelect } from 'formosa-material-ui-v3';
import { MenuItem } from '@material-ui/core';
const { CustomValidation, notEmpty, alpha, number, noop, success, error } = validations;

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowEmail: false,
    };
  }

  handleSubmit = (loginData) => {
    console.log(loginData);
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
        <ValidatedSelect name="type">
          <MenuItem value="ceo">CEO</MenuItem>
          <MenuItem value="sales">Sales</MenuItem>
          <MenuItem value="dev">Developer</MenuItem>
          <MenuItem value="devops">DevOps</MenuItem>
        </ValidatedSelect>
        <ValidatedSwitch name="isAdmin" />
        <ValidatedButton color="primary">LOGIN</ValidatedButton>
      </Form>
    );
  }
}
