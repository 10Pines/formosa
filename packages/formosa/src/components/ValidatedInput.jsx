import React from 'react';
import PropTypes from 'prop-types';

import { connectField } from './connectFieldHOC';

export const ValidatedInput = connectField(({errorMessage, wasTouched, ...props}) => (
  <React.Fragment>
    <input {...props} />
    {wasTouched && errorMessage ? <p>{errorMessage}</p> : null}
  </React.Fragment>
));
