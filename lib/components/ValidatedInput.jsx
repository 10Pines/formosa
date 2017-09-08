import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

export class ValidatedInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    const value = this.props.value || this.props.defaultValue || '';
    const error = this.props.validation(value);

    this.context.setInputState(this.props.name, value, R.isNil(error));
  }

  handleNewValue (value) {
    const error = this.props.validation(value);

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
        <p>{this.state.error}</p>
      </div>
    );
  }
}

ValidatedInput.contextTypes = { setInputState: PropTypes.func.isRequired };
ValidatedInput.propTypes = {
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  validation: PropTypes.func.isRequired,
  value: PropTypes.string,
};
