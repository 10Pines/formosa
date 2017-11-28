import React from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';
import { observable, observe } from 'mobx';
import R from 'ramda';

import { formValidation } from '../validations';
import * as core from '../core';


@observer
export class Form extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onInvalid: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onValid: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      form: observable(new core.Form(formValidation)),
    };
    observe(this.state.form, 'isValid', (change) => {
      if (change.type !== 'update') {
        return;
      };

      if (change.newValue) {
        if (this.props.onValid) this.props.onValid();
      } else {
        if (this.props.onInvalid) this.props.onInvalid();
      }
    }, true);
  }

  render () {
    const props = R.omit(['validation', 'onValid'], this.props);

    return (
      <form
        {...props}
        onSubmit={(evt) => {
          evt.preventDefault();
          this.props.onSubmit(this.state.form.value);
        }}
      >
        <Provider form={this.state.form}>
          <div>
            {this.props.children}
          </div>
        </Provider>
      </form>
    );
  }
}
