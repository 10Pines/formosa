import React from 'react';
import PropTypes from 'prop-types';

import { connectReadOnlyFieldHOC } from './connectReadOnlyFieldHOC';

export const ShowErrors = connectReadOnlyFieldHOC(class ShowErrors extends React.Component {

  render() {
    const {field, wasTouched, errorMessage, ...props} = this.props;

    return <p {...props}>
      {wasTouched && errorMessage ? errorMessage : null}
    </p>
  }
});
