import React from 'react';
import { Form, connectField, connectButton, validations } from 'formosa';
import { TextField, Toggle, RaisedButton } from 'material-ui';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedTextField: connectField(function ValidatedTextField({ field, ...props }) {
    return <TextField
      {...props}
      errorText={field.wasTouched && field.errorMessage}
    />;
  }),
  ValidatedButton: connectButton(function ValidatedButton({ isValid, ...props }) {
    return <RaisedButton
      {...props}
      type="submit"
      disabled={!isValid}
    />;
  }),
  ValidatedToggle: connectField(function ValidatedToggle({ field, onChange, ...props }) {
    return <Toggle
      {...props}
      onToggle={onChange}
    />;
  })
};
