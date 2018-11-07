import React from 'react';
import { mount } from 'enzyme';

import { Form, Field} from '../../models';
import { ValidatedInput } from '../ValidatedInput.jsx';
import { ValidatedButton } from '../ValidatedButton.jsx';
import { notEmpty, noop, never, formValidation } from '../../validations';

describe('ValidatedButton', () => {
  set('form', () => new Form(formValidation));
  set('wrapper', () => mount(
    <ValidatedButton formosa_form={form} >submit</ValidatedButton>)
  );

  it('is disabled', () => {
    wrapper;

    expect(form.isValid).toBe(false);
    expect(wrapper.find('button').prop('disabled')).toBe(true)
  });

  describe('when the form is valid', () => {

    beforeEach(() => {
      form.registerField('field', new Field(noop, ''))
    })

    it('is enabled', () => {
      wrapper;

      expect(form.isValid).toBe(true);
      expect(wrapper.find('button').prop('disabled')).toBe(false)
    });
  })
});
