import React from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';
import { observable, observe } from 'mobx';

import { formValidation } from '../validations';
import * as models from '../models';


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
      form: observable(new models.Form(formValidation)),
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
    const props = Object.assign({}, this.props);
    delete props.onValid;
    delete props.validation;
    delete props.formines_form;

    return (
      <form
        {...props}
        onSubmit={(evt) => {
          evt.preventDefault();
          this.props.onSubmit(this.state.form.value);
        }}
      >
        <Provider formines_form={this.state.form}>
          <div>
            {this.props.children}
          </div>
        </Provider>
      </form>
    );
  }
}
