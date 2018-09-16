import React from 'react';

export class PlainReactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    alert(JSON.stringify(this.state));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        username
        <input name="username" onChange={this.handleChange} /> <br />
        password
        <input name="password" onChange={this.handleChange} /> <br />
        <button>submit</button>
      </form>
    );
  }
}
