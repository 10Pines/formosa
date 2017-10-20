// @flow
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import * as core from '../core';

type Props = {
    children: any,
    onInvalid: () => void,
    onSubmit: (any) => void,
    onValid: () => void
};
type State = {
  form: core.Form
};

export class Form extends React.Component<Props, State> {
  static propTypes = {
    children: PropTypes.node,
    onInvalid: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onValid: PropTypes.func,
  };

  static childContextTypes = {
    registerField: PropTypes.func.isRequired
  };

  constructor (props: Props) {
    super(props);
    this.state = {
      form: new core.Form(),
    };
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
    const props = R.omit(['validation', 'onValid'], this.props);

    return (
      <form
        {...props}
        onSubmit={(evt) => {
          evt.preventDefault();
          this.props.onSubmit(this.state.form.getState());
        }}
      >
        {this.props.children}
      </form>
    );
  }
}
