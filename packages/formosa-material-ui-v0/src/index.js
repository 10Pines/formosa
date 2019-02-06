import React from 'react';
export * from 'formosa';
import { connectField, connectButton, validations } from 'formosa';
import { TextField, Toggle, RaisedButton } from 'material-ui';

export const ValidatedTextField =
  connectField({initialValue: ''})(function ValidatedTextField({ field, ...props }) {
    return <TextField
      {...props}
      errorText={field.wasTouched && field.errorMessage}
    />;
  });

export const ValidatedToggle =
  connectField({initialValue: false, validation: validations.noop})(function ValidatedToggle({ field, onChange, value, ...props }) {
    return <Toggle
      {...props}
      toggled={value}
      onToggle={onChange}
    />;
  });

export const ValidatedButton =
  connectButton(function ValidatedButton({ isValid, ...props }) {
    return <RaisedButton
             {...props}
             type="submit"
             disabled={!isValid}
    />;
  });
