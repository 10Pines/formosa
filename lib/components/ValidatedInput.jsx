import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { Field } from '../models';

@inject('form')
@observer
export class ValidatedInput extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.any,
    form: PropTypes.object,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    validation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      field: new Field(this.props.validation, '')
    };
  }

  componentWillMount() {
    this.props.form.registerField(this.props.name, this.state.field);
  }

  handleNewValue (value) {
    this.state.field.input = value;
  }

  render () {
    const { field } = this.state
    const props = Object.assign({}, this.props);
    delete props.onValid;
    delete props.validation;

    return (
      <div>
        <input
          {...props}
          onBlur={(evt) => {
            this.handleNewValue(evt.target.value);
            if (this.props.onBlur) {this.props.onBlur(evt);}
          }}
          onChange={(evt, newValue) => {
            this.handleNewValue(evt.target.value);
            if (this.props.onChange) {this.props.onChange(evt, newValue);}
          }}
        />
        {!field.isValid && field.wasTouched ? <p>{field.errorMessage}</p> : null}
      </div>
    );
  }
}
