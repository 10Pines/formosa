import React from 'react';

import 'semantic-ui-css/semantic.min.css';

import { NestedForm, validations } from 'formosa';
import { Form, ValidatedInput, ValidatedCheckbox, ValidatedButton } from 'formosa-semantic-ui-react';
const { CustomValidation, notEmpty, alpha, number, noop, success, error } = validations;

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowEmail: false,
    };
  }

  handleSubmit(loginData) {
    if (window.formSubmitted) {
      window.formSubmitted(loginData)
    } else {
      console.log(loginData);
    }
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
        <ValidatedInput
          name="username"
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
          <ValidatedInput
            name="value"
            type="password"
            validation={notEmpty}
          /> <br/>
          <ValidatedInput
            name="confirmation"
            type="password"
            validation={noop}
          /> <br/>
        </NestedForm>
        <ValidatedCheckbox
          name="isAdmin"
          onToggle={(evt, field) => {
            this.setState({shouldShowEmail: field.value});
          }}
        />
        {this.state.shouldShowEmail && <ValidatedInput
          name="email"
          validation={notEmpty}
        />} <br/>
        <ValidatedButton primary>LOGIN</ValidatedButton>
      </Form>
    );
  }
}
