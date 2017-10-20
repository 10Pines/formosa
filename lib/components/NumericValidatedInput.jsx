// @flow
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

type Props = {
    defaultValue?: number,
    name: string,
    onBlur?: (...any) => void,
    onChange?: (...any) => void,
    validation: number => ?string,
    value: number,
  };

type State = {
    value?: string,
    error?: string | null
}

export class NumericValidatedInput extends React.Component<Props, State> {

  static contextTypes = {
    setInputState: PropTypes.func.isRequired
  };

  static propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    validation: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  constructor (props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    const value: number = this.props.value || this.props.defaultValue || NaN;
    const error = isNaN(value) ? 'The value is not a valid number' : this.props.validation(value);

    this.context.setInputState(this.props.name, value, R.isNil(error));
  }

  handleNewValue (value: number) {
    const error = isNaN(value) ? 'The value is not a valid number' : this.props.validation(value);

    this.context.setInputState(this.props.name, value, R.isNil(error));
    this.setState({ error });
  }

  render () {
    const props = R.omit(['validation', 'onValid'], this.props);

    return (
      <div>
        <input
          {...props}
          onBlur={(evt) => {
            const number = !isNaN(evt.target.value) ? parseFloat(evt.target.value) : NaN;
            this.handleNewValue(number);
            if (this.props.onBlur) {
              this.props.onBlur(evt);
            }
          }}
          onChange={(evt, newValue) => {
            const number = !isNaN(evt.target.value) ? parseFloat(evt.target.value) : NaN;
            this.handleNewValue(number);
            if (this.props.onChange) {
              this.props.onChange(evt, newValue);
            }
          }}
        />
        <p>{this.state.error}</p>
      </div>
    );
  }
}
