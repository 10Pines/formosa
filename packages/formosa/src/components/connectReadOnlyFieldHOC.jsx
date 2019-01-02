import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { noop } from '../validations';

import { Field } from '../models';

export const connectReadOnlyFieldHOC = (Component) => {
  @inject('formosa_form') @observer class Wrapper extends React.Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
    };

    constructor(props) {
      super(props);
    }

    render () {
      const { formosa_form, name, ...props } = this.props;
      const field = formosa_form.fields.get(name);

      if (field) {
        return (
          <Component
            {...props}
            field={field}
            wasTouched={field.wasTouched}
            errorMessage={field.errorMessage}
            input={field.input}
            value={field.value}
          />
        );
      } else {
        return null;
      }
    }
  }
  Wrapper.displayName = `formosa-field-${Component.displayName || Component.name || 'Component'}`;
  return Wrapper;
}
