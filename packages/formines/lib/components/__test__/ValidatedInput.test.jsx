import React from 'react';
import { mount } from 'enzyme';

import { Form } from '../../models';
import { ValidatedInput } from '../ValidatedInput.jsx';
import { notEmpty, noop, never, formValidation } from '../../validations';

describe('ValidatedInput', () => {
  set('form', () => new Form(formValidation));
  set('wrapper', () => mount(
    <ValidatedInput
      formines_form={form}
      name='field'
      validation={validation}
    />)
  );
  set('validation', () => noop);

  describe('on mount', () => {
    it('registers itself with the form', () => {
      wrapper;

      expect(form.isValid).toBe(true);
      expect(form.value).toEqual({ field: '' });
    });
  });

  describe('After modification', () => {
    beforeEach(() => {
      wrapper.find('input').simulate('change', {
        target: { value: 'hi' } });
    })
    it('notifies the form', () => {
      expect(form.isValid).toBe(true);
      expect(form.fields.get('field').isValid).toBe(true);
      expect(form.fields.get('field').value).toBe('hi');
    });
  });

  describe('With never validations', () => {
    set('errorMessage', () => 'Some error happened');
    set('validation', () => never.withError(errorMessage));

    it('does not show the error message', () => {
      expect(wrapper.contains('p')).toBe(false);
    });

    describe('After modification', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', {
          target: { value: 'hi' } });
      })
      it('shows the error message', () => {
        expect(wrapper.find('p').text()).toEqual(errorMessage);
      });
    });

  })
});
