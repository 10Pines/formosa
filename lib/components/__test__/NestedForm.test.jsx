import React from 'react';
import { mount } from 'enzyme';

import { ValidatedInput } from '../ValidatedInput.jsx';
import { NestedForm } from '../NestedForm.jsx';
import { notEmpty, noop, formValidation, never } from '../../validations';
import { Form } from '../../core';

describe('NestedForm', () => {
  describe('on mount', () => {
    it('reports up the correct validation status', () => {
      let form = new Form(formValidation);
      mount(
        <NestedForm
          form={form}
          name='nested'
          validation={noop}
        >
          <ValidatedInput
            name='field'
            validation={notEmpty}
          />
        </NestedForm>);

      expect(form.isValid).toEqual(false);
    });
  });
  describe('after a subfield gets valid', () => {
    it('reports up the correct validation status', () => {
      let form = new Form(formValidation);
      const wrapper = mount(
        <NestedForm
          form={form}
          name='nested'
          validation={noop}
        >
          <ValidatedInput
            name='field'
            validation={notEmpty}
          />
        </NestedForm>);

      wrapper.find('input').simulate('change', {
        target: {
          value: 'hi'
        }
      });

      expect(form.isValid).toBe(true);
      expect(form.value).toEqual({
        nested: { field: 'hi' }
      });
    });
  });
  it('validates its own state with the validation function', () => {
    let form = new Form(formValidation);
    const errorMessage = 'There is something wrong';
    mount(
      <NestedForm
        form={form}
        name='nested'
        validation={never.withError(errorMessage)}
      >
        <ValidatedInput
          name='field'
          validation={noop}
        />
      </NestedForm>);

    expect(form.isValid).toBe(false);
    expect(form.fields.get('nested').errorMessage).toEqual(errorMessage);
  });
  it('shows the error message', () => {
    let form = new Form(formValidation);
    const errorMessage = 'There is something wrong';
    const wrapper = mount(
      <NestedForm
        form={form}
        id='nestedForm'
        name='nested'
        validation={never.withError(errorMessage)}
      >
        <ValidatedInput
          name='field'
          validation={noop}
        />
      </NestedForm>);

    expect(form.isValid).toEqual(false);
    expect(wrapper.find('#nestedForm > p').text()).toEqual(errorMessage);
  });
});
