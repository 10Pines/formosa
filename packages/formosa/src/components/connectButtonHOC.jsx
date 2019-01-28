import React from 'react';
import { observer, inject } from 'mobx-react';

export const connectButton = (Component) => {
  @inject('formosa_form') @observer class Wrapper extends React.Component {
    render () {
      const { formosa_form, ...props } = this.props;

      return (
        <Component isValid={formosa_form.isValid} {...props} />
      );
    }
  }
  Wrapper.displayName = `formosa-button-${Component.displayName || Component.name || 'Component'}`;
  return Wrapper;
};

