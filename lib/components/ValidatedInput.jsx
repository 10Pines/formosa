// @flow
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import { Field } from '../core';

type Props = {
  defaultValue?: string,
  name: string,
  onBlur?: (...any) => void,
  onChange?: (...any) => void,
  validation: string => ?string
};

type State = {
  field: Field,
  fieldCallback: (Field) => void,
};

export class ValidatedInput extends React.Component<Props, State> {

  static contextTypes = {
    registerField: PropTypes.func.isRequired
  };

  static propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    validation: PropTypes.func.isRequired,
  };

  constructor (props: Props, { registerField }: { registerField: (string, Field) => ((Field) => void)}) {
    super(props);
    this.state = {
      field: new Field('', props.validation)
    };
  }

  componentWillMount() {
    this.setState({ fieldCallback: this.context.registerField(this.props.name, this.state.field) });
  }

  handleNewValue (value: string) {
    const field: Field<string> = new Field(value, this.props.validation);
    this.state.fieldCallback(field);
    this.setState({ field });
  }

  render () {
    const props = R.omit(['validation', 'onValid'], this.props);

    return (
      <div>
        <input
          {...props}
          onBlur={(evt) => {
            this.handleNewValue(evt.target.value);
            if (this.props.onBlur) {
              this.props.onBlur(evt);
            }
          }}
          onChange={(evt, newValue) => {
            this.handleNewValue(evt.target.value);
            if (this.props.onChange) {
              this.props.onChange(evt, newValue);
            }
          }}
        />
        <p>{this.state.field.getError()}</p>
      </div>
    );
  }
}
