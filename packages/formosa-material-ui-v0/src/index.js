import React from 'react';
import { Form, connectField, connectButton, validations } from 'formosa';
import { TextField, Toggle, RaisedButton } from 'material-ui';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedTextField: connectField({initialValue: ''})(function ValidatedTextField({ field, ...props }) {
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
  ValidatedToggle: connectField({initialValue: false, validation: validations.noop})(function ValidatedToggle({ field, onChange, value, ...props }) {
    return <Toggle
      {...props}
      toggled={value}
      onToggle={onChange}
    />;
  })
};
