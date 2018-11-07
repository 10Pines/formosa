import React from 'react';
import PropTypes from 'prop-types';

import { connectField } from './connectFieldHOC';

export const ValidatedSelect = connectField(({errorMessage, wasTouched, ...props}) => (
  <React.Fragment>
    <select {...props} />
    {wasTouched && errorMessage ? <p>{errorMessage}</p> : null}
  </React.Fragment>
));
