import React from 'react';
export * from 'formosa';
import { Form as SForm, Message, Checkbox, Button} from 'semantic-ui-react';

export const ValidatedInput =
  connectField({initialValue: ''})(function ValidatedInput({field, onChange, ...props}) {
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
  });

export const ValidatedCheckbox =
  connectField({initialValue: false})(function ValidatedCheckbox({field, value, onChange, ...props}) {
    return <Checkbox
      {...props}
      checked={value}
      onChange={(evt, data) => {
        onChange(evt, data.checked)
      }}
    />;
  });

export const ValidatedButton =
  connectButton(function ValidatedButton({isValid, ...props}) {
    return <Button
      disabled={! isValid}
      {...props}
    />
  });
