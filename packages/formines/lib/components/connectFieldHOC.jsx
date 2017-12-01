import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { Field } from '../models';

export const connectField = (Component) => {
  @inject('form') @observer class Wrapper extends React.Component {
  
    static propTypes = {
      defaultValue: PropTypes.any,
      form: PropTypes.object,
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      validation: PropTypes.object.isRequired,
    };
  
    constructor(props) {
      super(props);
      const defaultValue = this.props.defaultValue === undefined ? '' : this.props.defaultValue;
      this.state = {
        field: new Field(this.props.validation, defaultValue)
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
      if (field.wasTouched) {
        props.errorMessage = field.errorMessage;
      }
      delete props.onValid;
      delete props.onChange;
      delete props.validation;
  
      return (
        <Component
          {...props}
          onChange={(evt) => {
            this.handleNewValue(evt.target.value);
            if (this.props.onChange) {
              this.props.onChange(evt);
            }
          }}
        />
      );
    }
  }
  Wrapper.displayName = `formines-field-${Component.displayName}`;
  return Wrapper;
}

