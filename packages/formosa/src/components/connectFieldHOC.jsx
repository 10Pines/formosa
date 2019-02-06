import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { noop } from '../validations';
import { Field } from '../models';

export const connectField = (defaultProps) => (Component) => {
  @inject('formosa_form') @observer class Wrapper extends React.Component {
    static propTypes = {
      initialValue: PropTypes.any,
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      validation: PropTypes.object.isRequired,
    };

    constructor(originalProps) {
      super(originalProps);

      const initialValue = originalProps.initialValue || defaultProps.initialValue;
      const validation = originalProps.validation || defaultProps.validation;

      this.state = {
        field: new Field(validation, initialValue)
      };
    }

    componentDidMount() {
      this.props.formosa_form.registerField(this.props.name, this.state.field);
    }

    componentWillUnmount() {
      this.state.field.delete();
    }

    handleNewValue (evt, newValue) {
      if (newValue !== undefined) {
        this.state.field.input = newValue;
      } else if (evt.target.type === 'checkbox') {
        this.state.field.input = evt.target.checked;
      } else {
        this.state.field.input = evt.target.value;
      }
    }

    render () {
      const { field } = this.state;
      const newProps = Object.assign({}, this.props);
      newProps.field = field;
      delete newProps.initialValue;
      delete newProps.onValid;
      delete newProps.onChange;
      delete newProps.validation;
      delete newProps.formosa_form;

      return (
        <Component
          {...newProps}
          value={field.input}
          onChange={(evt, newValue) => {
            this.handleNewValue(evt, newValue);
            if (this.props.onChange) {
              this.props.onChange(evt, field);
            }
          }}
        />
      );
    }
  }
  Wrapper.displayName = `formosa-field-${Component.displayName || Component.name || 'Component'}`;
  return Wrapper;
}
