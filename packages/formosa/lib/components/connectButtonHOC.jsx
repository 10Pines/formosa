import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { noop } from '../validations';

import { Field } from '../models';

export const connectButton = (Component) => {
  @inject('formosa_form') @observer class Wrapper extends React.Component {
    constructor (props) {
      super(props);
    }

    render () {
      const { formosa_form, ...props } = this.props;

      return (
        <Component isValid={formosa_form.isValid} {...props} />
      );
    }
  }
  Wrapper.displayName = `formosa-button-${Component.displayName || Component.name || 'Component'}`;
  return Wrapper;
}
