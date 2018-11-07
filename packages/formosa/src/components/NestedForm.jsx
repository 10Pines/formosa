import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, Provider } from 'mobx-react';
import { autorun } from 'mobx';

import { formValidation, noop } from '../validations';
import { Form } from '../models';

@inject('formosa_form')
@observer
export class NestedForm extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    formosa_form: PropTypes.object,
    name: PropTypes.string.isRequired,
    validation: PropTypes.object.isRequired,
    errorsComponent: PropTypes.any,
  };

  static defaultProps = {
    errorsComponent: ({errors}) => <p>{errors}</p>,
  };

  constructor (props) {
    super(props);
    this.state = {
      form: new Form(formValidation.then(this.props.validation))
    };
  }

  componentWillMount() {
    this.props.formosa_form.registerField(this.props.name, this.state.form);
    autorun(() => {
      if (this.state.form.isValid) {
        if (this.props.onValid) this.props.onValid();
      } else {
        if (this.props.onInvalid) this.props.onInvalid();
      }
    });
  }

  render () {
    const { form } = this.state;

    const props = Object.assign({}, this.props);
    delete props.validation;
    delete props.formosa_form;
    delete props.errorsComponent;

    const ErrorsComponent = this.props.errorsComponent;

    return (
      <Provider formosa_form={this.state.form}>
        <div {...props}>
          {this.props.children}
          {! form.isValid && form.wasTouched ?
            <ErrorsComponent errors={form.errorMessage}/> : null}
        </div>
      </Provider>
    );
  }
}
