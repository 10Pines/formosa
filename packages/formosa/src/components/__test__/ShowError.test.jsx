import React from 'react';
import { mount } from 'enzyme';

import { Form } from '../../models';
import { ValidatedInput } from '../ValidatedInput.jsx';
import { ShowErrors } from '../ShowErrors.jsx';
import { notEmpty, noop, never, formValidation } from '../../validations';

describe('ShowError', () => {
  set('form', () => new Form(formValidation));
  set('wrapper', () => mount(
    <div>
      <ValidatedInput
        formosa_form={form}
        name='field'
        validation={validation}
      />
      <ShowErrors
        id='errors'
        formosa_form={form}
        name='field'
      />
    </div>
    )
  );
  set('validation', () => noop);

  describe('After modification', () => {
    beforeEach(() => {
      wrapper.find('input').simulate('change', {
        target: { value: 'hi' } });
    });

    it('shows nothing but exists', () => {
      expect(wrapper.exists('p#errors')).toBe(true)
      expect(wrapper.find('p#errors').text()).toBe('')
    });
  });

  describe('With never validations', () => {
    set('errorMessage', () => 'Some error happened');
    set('validation', () => never.withError(errorMessage));

    it('does not show the error message since it was never touched', () => {
      expect(wrapper.exists('ShowErrors#errors')).toBe(true)
      expect(wrapper.find('ShowErrors#errors').text()).toBe('')
    });

    describe('After being touched', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', {
          target: { value: 'aaaa' } });
      });

      it('shows the error message', () => {
        expect(wrapper.exists('ShowErrors#errors')).toBe(true)
        expect(wrapper.find('ShowErrors#errors').text()).toBe(errorMessage)
      });
    });

  })
});
