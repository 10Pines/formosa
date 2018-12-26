# Formosa

[![Build Status](https://travis-ci.org/10Pines/formosa.svg?branch=master)](https://travis-ci.org/10Pines/formosa)
[![npm](https://img.shields.io/npm/v/formosa.svg)](https://www.npmjs.com/package/formosa)

## What?

The objective of this library is to make building dynamic forms with complex validations easier leveraging MobX

## Example

```JSX
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        onValid={() => this.setState({isValid: true})}
        onInvalid={() => this.setState({isValid: false})}
      >
        <ValidatedInput
          name="username"
          validation={notEmpty.and(alphaOnly)}
        />
        <ValidatedInput
          name="password"
          validation={notEmpty}
        />
        <button type='submit' disabled={!this.state.isValid}/>
      </Form>
    );
  }
}
```

This simple example shows the most basic features of this library,
among the most important it includes:

- Nested forms: There can be sections of a form that validate multiple fields.
    eg, a field can never be higher than the other number
