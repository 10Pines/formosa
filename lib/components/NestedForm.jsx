import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, Provider } from 'mobx-react';
import { autorun } from 'mobx';

import { formValidation, noop } from '../validations';
import { Form } from '../models';

@inject('form')
@observer
export class NestedForm extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    form: PropTypes.object,
    name: PropTypes.string.isRequired,
    validation: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      form: new Form(formValidation.then(this.props.validation))
    };
  }

  componentWillMount() {
    this.props.form.registerField(this.props.name, this.state.form);
    autorun(() => {
      if (this.state.form.isValid) {
        if (this.props.onValid) this.props.onValid();
      } else {
        if (this.props.onInvalid) this.props.onInvalid();
      }
    });
  }

  render () {
    const props = Object.assign({}, this.props);
    delete props.validation;

    return (
      <Provider form={this.state.form}>
        <div {...props}>
          {this.props.children}
          {! this.state.form.isValid ?
            <p>{this.state.form.errorMessage}</p> : null}
        </div>
      </Provider>
    );
  }
}
