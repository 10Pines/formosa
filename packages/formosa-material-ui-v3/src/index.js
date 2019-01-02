import React from 'react';
import { Form, connectField, connectButton, validations } from 'formosa';
import { TextField, Button, Switch } from '@material-ui/core';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedTextField: connectField({defaultValue: ''})(function ValidatedTextField({ field, ...props }) {
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
  ValidatedSwitch: connectField({defaultValue: false, validation: validations.noop })(function ValidatedToggle({ field, value, ...props }) {
    return <Switch
      {...props}
      checked={value}
    />;
  })
};
