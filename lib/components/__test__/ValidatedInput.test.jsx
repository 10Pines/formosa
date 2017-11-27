import React from 'react';
import { mount } from 'enzyme';

import { Form } from '../../core';
import { ValidatedInput } from '../ValidatedInput.jsx';
import { notEmpty, noop, never, formValidation } from '../../validations';

describe('ValidatedInput', () => {
  describe('on mount', () => {
    it('registers itself with the form', () => {
      const form = new Form(formValidation);
      mount(
        <ValidatedInput
          form={form}
          name='field'
          validation={noop}
        />);

      expect(form.isValid).toBe(true);
      expect(form.value).toEqual({
        field: ''
      });
    });
  });

  describe('After modification', () => {
    it('notifies the form', () => {
      let form = new Form(formValidation);

      const wrapper = mount(
        <ValidatedInput
          form={form}
          name='field'
          validation={notEmpty}
        />);

      wrapper.find('input').simulate('change', {
        target: { value: 'hi' } });

      expect(form.isValid).toBe(true);
      expect(form.fields.get('field').isValid).toBe(true);
      expect(form.fields.get('field').value).toBe('hi');
    });
  });

  describe('After modification', () => {
    it('shows the error message', () => {
      const errorMessage = 'Some error happened';
      let form = new Form(formValidation);

      const wrapper = mount(
        <ValidatedInput
          form={form}
          name='field'
          validation={never.withError(errorMessage)}
        />);

      wrapper.find('input').simulate('change', {
        target: { value: 'hi' } });

      expect(wrapper.find('p').text()).toEqual(errorMessage);
    });
  });

  it('shows the error message', () => {
    const errorMessage = 'Some error happened';
    let form = new Form(formValidation);

    const wrapper = mount(
      <ValidatedInput
        form={form}
        name='field'
        validation={never.withError(errorMessage)}
      />);

    expect(wrapper.contains('p')).toBe(false);
  });
});
