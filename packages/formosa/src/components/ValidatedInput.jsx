import React from 'react';
import PropTypes from 'prop-types';

import { connectField } from './connectFieldHOC';

export const ValidatedInput = connectField({initialValue: ''})(({field, ...props}) => (
  <React.Fragment>
    <input {...props} />
    {field.wasTouched && field.errorMessage ? <p>{field.errorMessage}</p> : null}
  </React.Fragment>
));
