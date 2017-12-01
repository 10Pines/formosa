import React from 'react';
import PropTypes from 'prop-types';

import { connectField } from './connectFieldHOC';

export const ValidatedInput = connectField(({errorMessage, ...props}) => (
  <div>
    <input {...props} />
    {errorMessage ? <p>{errorMessage}</p> : null}
  </div>
));