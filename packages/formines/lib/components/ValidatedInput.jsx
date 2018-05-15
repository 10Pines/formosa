import React from 'react';
import PropTypes from 'prop-types';

import { connectField } from './connectFieldHOC';

export const ValidatedInput = connectField(({errorMessage, ...props}) => (
  [ <input {...props} />
  , {errorMessage ? <p>{errorMessage}</p> : null}
  ]
));
