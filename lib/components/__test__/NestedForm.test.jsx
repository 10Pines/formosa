import React from 'react';
import { mount } from 'enzyme';

import { ValidatedInput } from '../ValidatedInput.jsx';
import { NestedForm } from '../NestedForm.jsx';
import { notEmpty, noop } from '../../validations';

import { Form } from '../../core';

describe('NestedForm', () => {
  describe('on mount', () => {
    it.only('reports up the correct validation status', () => {
      let form = new Form();
      mount(
        <NestedForm
          name='nested'
          validation={noop}
        >
          <ValidatedInput
            name='field'
            validation={notEmpty}
          />
        </NestedForm>, {
          context: {
            registerField: form.registerField.bind(form)
          }
        });

      expect(form.getState()).toEqual({
        nested: { field: '' }
      });
    });
  });
  describe('after a subfield gets valid', () => {
    it('reports up the correct validation status', () => {
      const validCallback = jest.fn();
      const wrapper = mount(
        <NestedForm
          name='nested'
          validation={noop}
        >
          <ValidatedInput
            name='field'
            validation={notEmpty}
          />
        </NestedForm>, {
          context: {
            setInputState: validCallback
          }
        });

      wrapper.find('input').simulate('change', {
        target: {
          value: 'hi'
        }
      });

      expect(validCallback).toHaveBeenLastCalledWith(
        'nested',         // Name of the field
        { field: 'hi' },  // content of the field
        true             // is it valid?
      );
    });
  });
  it('validates its own state with the validation function', () => {
    const validCallback = jest.fn();
    const errorMessage = 'There is something wrong';
    mount(
      <NestedForm
        name='nested'
        validation={() => errorMessage}
      >
        <ValidatedInput
          name='field'
          validation={noop}
        />
      </NestedForm>, {
        context: {
          setInputState: validCallback
        }
      });

    expect(validCallback).toHaveBeenLastCalledWith(
      'nested',         // Name of the field
      { field: '' },    // content of the field
      false             // is it valid?
    );
  });
  it('shows the error message', () => {
    const validCallback = jest.fn();
    const errorMessage = 'There is something wrong';
    const wrapper = mount(
      <NestedForm
        id='nestedForm'
        name='nested'
        validation={() => errorMessage}
      >
        <ValidatedInput
          name='field'
          validation={noop}
        />
      </NestedForm>, {
        context: {
          setInputState: validCallback
        }
      });

    expect(wrapper.find('#nestedForm > p').text()).toEqual(errorMessage);

    expect(validCallback).toHaveBeenLastCalledWith(
      'nested',         // Name of the field
      { field: '' },    // content of the field
      false             // is it valid?
    );
  });
});
