import React from 'react';
import { Form, connectField, validations } from 'formosa';
import { Form as SForm, Message, Checkbox } from 'semantic-ui-react';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedInput: connectField(function ValidatedInput({wasTouched, errorMessage, onChange, ...props}) {
    return [
      <SForm.Input
        key="_formosa_input"
        {...props}
        onChange={(evt, {newValue}) => {
          onChange(evt, newValue);
        }}
      />
      , (wasTouched && errorMessage) ? <Message
        key="_formosa_error_message"
        error
        visible
        content={errorMessage}
      /> : null,
    ];
  }),
  ValidatedCheckbox: connectField(function ValidatedCheckbox({wasTouched, errorMessage, ...props}) {
    return <Checkbox
      {...props}
    />;
  }),
};
