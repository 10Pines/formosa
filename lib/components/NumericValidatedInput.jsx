import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

export class NumericValidatedInput extends React.Component {

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

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    const value = this.props.value || this.props.defaultValue || NaN;
    const error = isNaN(value) ? 'The value is not a valid number' : this.props.validation(value);

    this.context.setInputState(this.props.name, value, R.isNil(error));
  }

  handleNewValue (value) {
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
            const number = !isNaN(evt.target.value) ? parseFloat(evt.target.value, 10) : NaN;
            this.handleNewValue(number);
            if (this.props.onBlur) {
              this.props.onBlur(evt);
            }
          }}
          onChange={(evt, newValue) => {
            const number = !isNaN(evt.target.value) ? parseFloat(evt.target.value, 10) : NaN;
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
