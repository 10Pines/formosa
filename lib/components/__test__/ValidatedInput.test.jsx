import React from 'react';
import { mount } from 'enzyme';

import { ValidatedInput } from '../ValidatedInput.jsx';
import { notEmpty } from '../../validations';

describe('ValidatedInput', () => {
  describe('on mount', () => {
    it('reports up the correct validation status', () => {
      const validCallback = jest.fn();
      mount(
        <ValidatedInput
          name='field'
          validation={notEmpty}
        />, {
          context: {
            setInputState: validCallback
          }
        });

      expect(validCallback.mock.calls.length).toBe(1);
      expect(validCallback).toHaveBeenCalledWith(
        'field',     // Name of the field
        '',          // content of the field
        false        // is it valid?
      );
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
            setInputState: jest.fn()
          }
        });

      wrapper.find('input').simulate('change', {
        target: {
          value: 'hi'
        }
      });

      expect(wrapper.find('p').text()).toEqual(errorMessage);
    });
  });
});
