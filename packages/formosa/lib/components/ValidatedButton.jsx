import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, Provider } from 'mobx-react';
import { autorun } from 'mobx';

import { formValidation, noop } from '../validations';
import { connectButton } from './connectButtonHOC';


export const ValidatedButton = connectButton(({isValid, ...props}) =>
  <button disabled={!isValid} {...props} />
);
