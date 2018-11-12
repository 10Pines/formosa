import React from 'react';
import { Form, connectField, validations } from 'formosa';
import { Form as SForm, Message, Checkbox } from 'semantic-ui-react';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedInput: connectField(function ValidatedInput({field, onChange, ...props}) {
    return [
      <SForm.Input
        key="_formosa_input"
        {...props}
        onChange={(evt, {newValue}) => {
          onChange(evt, newValue);
        }}
      />
      , (field.wasTouched && field.errorMessage) ? <Message
        key="_formosa_error_message"
        error
        visible
        content={field.errorMessage}
      /> : null,
    ];
  }),
  ValidatedCheckbox: connectField(function ValidatedCheckbox({...props}) {
    return <Checkbox
      {...props}
    />;
  }),
};
