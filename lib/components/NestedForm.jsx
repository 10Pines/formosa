// @flow
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import { Field } from '../core'

type Props = {
    name: string,
    children: any,
    validation: any => string | null
};
type State = {
    field: Field
};

export class NestedForm extends React.Component<Props, State> {
  static contextTypes = {
    setInputState: PropTypes.func.isRequired
  };

  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    validation: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    registerField: PropTypes.func.isRequired
  };

  constructor (props: Props) {
    super(props);
    this.state = {};
  }

  getChildContext () {
    return {
      registerField: (name: string, field: core.Field) => {
        const notifyCallback = this.state.form.registerField(name, field);
        this.refreshState();
        // force redrawing of the screen
        return (field: core.Field) => {
          notifyCallback(field);
          this.refreshState();
        };
      }
    };
  }

  getChildContext () {
    return {
      registerField: (name: string, isValid: boolean) => {
        this.setState(
          state => ({ value: R.assoc(name, { value, isValid }, state.value) }),
          () => {
            const stateObject = R.map(R.prop('value'), this.state.value);
            const error = this.props.validation(this.state.value);
            const isValid = R.all(R.prop('isValid'), R.values(this.state.value)) && R.isNil(error);

            this.context.setInputState(this.props.name, stateObject, isValid);
            this.setState({ error });
          }
        );
      }
    };
  }

  refreshState() {
    this.setState(this.state, () => {
      if (this.state.form.isValid()) {
        this.props.onValid();
      } else {
        this.props.onInvalid();
      }
    });
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
