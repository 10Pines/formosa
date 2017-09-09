
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

const debug = (o) => {
  console.log(o);
  return o;
}

export class NestedForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  getChildContext () {
    return {
      setInputState: (name, value, isValid) => {
        this.setState(
          state => ({ value: R.assoc(name, { value, isValid }, state.value) }),
          () => {
            const stateObject = R.map(R.prop('value'), this.state.value);
            const error = this.props.validation(this.state.value);
            const isValid = R.all(R.prop('isValid'), R.values(this.state.value)) && R.isNil(error);

            this.context.setInputState(this.props.name, stateObject, isValid);
            this.setState({ error });
          });
      }
    };
  }

  render () {
    const props = R.omit(['validation'], this.props);

    return (
      <div {...props}>
        {this.props.children}
        <p>{this.state.error}</p>
      </div>
    );
  }
}

NestedForm.contextTypes = { 
  setInputState: PropTypes.func.isRequired 
};

NestedForm.propTypes = {
  name: PropTypes.string.isRequired,
  validation: PropTypes.func.isRequired,
};

NestedForm.childContextTypes = { 
  setInputState: PropTypes.func.isRequired 
};
