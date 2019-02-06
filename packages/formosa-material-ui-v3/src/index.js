import React from 'react';
export * from 'formosa';
import { connectField, connectButton, validations } from 'formosa';
import { TextField, Button, Switch, Select } from '@material-ui/core';

export const ValidatedTextField =
  connectField({initialValue: ''})(function ValidatedTextField({ field, ...props }) {
    return <TextField
      {...props}
      error={!!(field.wasTouched && field.errorMessage)}
      helperText={field.wasTouched && field.errorMessage}
    />;
  });

export const ValidatedButton =
  connectButton(function ValidatedButton({ isValid, ...props }) {
    return <Button
      {...props}
      type="submit"
      disabled={!isValid}
    />;
  });

export const ValidatedSwitch =
  connectField({initialValue: false, validation: validations.noop })(function ValidatedToggle({ field, value, ...props }) {
    return <Switch
      {...props}
      checked={value}
    />;
  });

export const ValidatedSelect =
  connectField({initialValue: '', validation: validations.notEquals('')})(function ValidatedSelect({field, onChange, ...props }) {
    return <Select
      {...props}
      onChange={(evt) => {
        onChange(evt)
      }}
    />
  });
