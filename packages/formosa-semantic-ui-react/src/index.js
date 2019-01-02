import React from 'react';
import { Form, connectField, connectButton, validations } from 'formosa';
import { Form as SForm, Message, Checkbox, Button} from 'semantic-ui-react';

module.exports = {
  Form,
  connectField,
  validations,
  ValidatedInput: connectField({defaultValue: ''})(function ValidatedInput({field, onChange, ...props}) {
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
  ValidatedCheckbox: connectField({defaultValue: false})(function ValidatedCheckbox({field, value, onChange, ...props}) {
    return <Checkbox
      {...props}
      checked={value}
      onChange={(evt, data) => {
        onChange(evt, data.checked)
      }}
    />;
  }),
  ValidatedButton: connectButton(function ValidatedButton({isValid, ...props}) {
    return <Button
      disabled={! isValid}
      {...props}
    />
  })
};
