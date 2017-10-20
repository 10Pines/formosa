import React from 'react';
import { mount } from 'enzyme';

import { Form } from '../../core';
import { ValidatedInput } from '../ValidatedInput.jsx';
import { notEmpty } from '../../validations';

describe('ValidatedInput', () => {
  describe('on mount', () => {
    it('registers itself with the form', () => {
      const registerField = jest.fn();
      mount(
        <ValidatedInput
          name='field'
          validation={notEmpty}
        />, { context: { registerField: registerField } });

      expect(registerField.mock.calls.length).toBe(1);
      expect(registerField.mock.calls[0][0]).toEqual('field');
    });
  });

  describe('After modification', () => {
    it('notifies the form', () => {
      let form = new Form();

      const wrapper = mount(
        <ValidatedInput
          name='field'
          validation={notEmpty}
        />, { context: { registerField: form.registerField.bind(form) } });

      wrapper.find('input').simulate('change', {
        target: { value: 'hi' } });

      expect(form.fields['field'].getError()).toBeNull();
      expect(form.fields['field'].isValid()).toBe(true);
    });
  });

  describe('After modification', () => {
    it('shows the error message', () => {
      const errorMessage = 'Something is wrong';
      const wrapper = mount(
        <ValidatedInput
          name='field'
          validation={(input) => errorMessage}
        />, {
          context: {
            registerField: () => ({ notify: jest.fn() })
          }
        });

      wrapper.find('input').simulate('change', {
        target: { value: 'hi' } });

      expect(wrapper.find('p').text()).toEqual(errorMessage);
    });
  });
});
