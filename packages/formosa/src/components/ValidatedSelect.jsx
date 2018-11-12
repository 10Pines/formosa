import React from 'react';
import PropTypes from 'prop-types';

import { connectField } from './connectFieldHOC';

export const ValidatedSelect = connectField(({field, ...props}) => (
  <React.Fragment>
    <select {...props} />
    {field.wasTouched && field.errorMessage ? <p>{field.errorMessage}</p> : null}
  </React.Fragment>
));
