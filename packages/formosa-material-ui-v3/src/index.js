import React from 'react';
import { Form, connectField, connectButton, validations } from 'formosa';
import { TextField } from '@material-ui/core';
// import { Toggle } from 'material-ui/core';
import { Button } from '@material-ui/core';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedTextField: connectField(function ValidatedTextField({ field, ...props }) {
    return <TextField
      {...props}
      error={!!(field.wasTouched && field.errorMessage)}
      helperText={field.wasTouched && field.errorMessage}
    />;
  }),
  ValidatedButton: connectButton(function ValidatedButton({ isValid, ...props }) {
    return <Button
      {...props}
      type="submit"
      disabled={!isValid}
    />;
  }),
  // ValidatedToggle: connectField(function ValidatedToggle({ field, onChange, ...props }) {
  //   return <Toggle
  //     {...props}
  //     onToggle={onChange}
  //   />;
  // })
};
