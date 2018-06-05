import React from 'react';
import { mount } from 'enzyme';

import { ValidatedInput } from '../ValidatedInput.jsx';
import { NestedForm } from '../NestedForm.jsx';
import { notEmpty, noop, formValidation, never } from '../../validations';
import { Form } from '../../models';

describe('NestedForm', () => {
  set('form', () => new Form(formValidation));
  set('validation', () => noop);
  set('wrapper', () => mount(
    <NestedForm
      formines_form={form}
      id='nestedForm'
      name='nested'
      validation={validation}
    >
      <ValidatedInput
        name='field'
        validation={noop}
      />
    </NestedForm>)
  );
  describe('on mount', () => {
    it('reports up the correct validation status', () => {
      expect(form.isValid).toEqual(false);
    });
  });
  describe('after a subfield gets valid', () => {
    beforeEach(() => {
      wrapper.find('input')
        .simulate('change', {target: { value: 'hi' }});
    })
    it('reports up the correct validation status', () => {
      expect(form.isValid).toBe(true);
      expect(form.value).toEqual({
        nested: { field: 'hi' }
      });
    });
  });

  describe('with an always invalid validation', () => {
    set('errorMessage', () => 'There is something wrong');
    set('validation', () => never.withError(errorMessage));

    it('validates its own state with the validation function', () => {
      wrapper;

      expect(form.isValid).toBe(false);
      expect(form.fields.get('nested').errorMessage).toEqual(errorMessage);
    });

    it('does not show the error message', () => {
      wrapper.find('input').simulate('change', { target: { value: 'hi' } });

      expect(form).toHaveProperty('isValid', false);
      expect(wrapper.find('p.error-message').text()).toEqual(errorMessage);
    });

    describe('before it was touched', () => {

    })
  })
});
