import React from 'react';
import { Form, connectField, validations } from 'formosa';
import { TextField, Toggle } from 'material-ui';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedTextField: connectField(function ValidatedTextField({ wasTouched, errorMessage, ...props }) {
    return <TextField
      {...props}
      errorText={wasTouched && errorMessage}
    />;
  }),
  ValidatedToggle: connectField(function ValidatedToggle({ wasTouched, errorMessage, onChange, ...props }) {
    return <Toggle
      {...props}
      onToggle={onChange}
    />;
  })
};
