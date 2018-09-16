import React from 'react';
import { Form, NestedForm, ValidatedInput, ValidatedSelect, ValidatedButton, connectField, validations } from 'formosa';

export class FormosaFormWithType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
  }

  subcontenidoParaType() {
    switch (this.state.type) {
      case 'premium':
        return <div> tarjeta <ValidatedInput name="cardNumber" validation={validations.notEmpty} /></div>;
      default:
        return null;
    }
  }

  render() {
    return (
      <Form onSubmit={o => alert(JSON.stringify(o))}>
        username
        <ValidatedInput name="username" validation={validations.notEmpty} /><br />
        type
        <ValidatedSelect
          name="type"
          validation={validations.notEmpty}
          onChange={(_evt, field) => this.setState({ type: field.value })}
        >
          <option value=""> - </option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </ValidatedSelect><br />
        {this.subcontenidoParaType()}
        <ValidatedButton>submit</ValidatedButton>
      </Form>
    );
  }
}
