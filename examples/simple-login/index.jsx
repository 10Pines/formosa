import React from 'react';
import ReactDOM from 'react-dom';

import { Form, ValidatedInput } from '../../lib';
import { notEmpty, alpha } from '../../lib/validations';

console.log('notempty', notEmpty);
console.log('alpha', alpha);

class LoginForm extends React.Component {
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
  }

  render() {
    return (
      <Form
        onInvalid={() => this.setState({ isValid: false })}
        onSubmit={this.handleSubmit}
        onValid={() => this.setState({ isValid: true })}
      >
        <ValidatedInput 
          name="username" 
          validation={notEmpty.and(alpha).withError(`Please insert a valid username`)} 
        />
        <ValidatedInput 
          name="password" 
          validation={notEmpty} 
        />
        <button 
          disabled={!this.state.isValid}
          type='submit' 
        > LOGIN </button>
      </Form>
    );
  }
}

console.log('starting application');
ReactDOM.render(<LoginForm />, document.getElementById('root'));
