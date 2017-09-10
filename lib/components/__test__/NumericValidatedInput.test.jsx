import React from 'react';
import { mount } from 'enzyme';

import { NumericValidatedInput } from '../NumericValidatedInput.jsx';

describe('NumericValidatedInput', () => {
  describe('on mount', () => {
    it('reports up the correct validation status', () => {
      const validCallback = jest.fn();
      mount(
        <NumericValidatedInput
          name='numericField'
          validation={(n) => n <= 0 ? 'Number must be greater than 0' : null}
        />, {
          context: {
            setInputState: validCallback
          }
        });

      expect(validCallback.mock.calls.length).toBe(1);
      expect(validCallback).toHaveBeenCalledWith('numericField', NaN, false);
    });
  });
  describe('after a change to a valid number', () => {
    it('reports up the correct validation status', () => {
      const validCallback = jest.fn();
      const wrapper = mount(
        <NumericValidatedInput
          name='numericField'
          validation={(n) => n <= 0 ? 'Number must be greater than 0' : null}
        />, {
          context: {
            setInputState: validCallback
          }
        }
      );

      wrapper.find('input').simulate('change', { target: { value: '12' } });

      expect(validCallback).toHaveBeenLastCalledWith( 'numericField', 12, true);
    });
  });
  describe('after a change to an invalid number', () => {
    it('reports up the correct validation status', () => {
      const validCallback = jest.fn();
      const wrapper = mount(
        <NumericValidatedInput
          name='numericField'
          validation={(n) => n <= 0 ? 'Number must be greater than 0' : null}
        />, {
          context: {
            setInputState: validCallback
          }
        }
      );

      wrapper.find('input').simulate('change', { target: { value: '-12' } });

      expect(validCallback).toHaveBeenLastCalledWith('numericField', -12, false);
    });
  });
});
