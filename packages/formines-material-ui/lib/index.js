import React from 'react';
import { Form, connectField, validations } from 'formines';
import { TextField, Toggle } from 'material-ui';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedTextField: connectField(({ errorMessage, ...props }) => (
    <TextField
      {...props}
      errorText={errorMessage}
    />
  )),
  ValidatedToggle: connectField(({ errorMessage, onChange, ...props }) => (
    <Toggle
      {...props}
      onToggle={(evt, isChecked) => {
        onChange({ target: { value: isChecked } });
      }}
    />
  ))
};
