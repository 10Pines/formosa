import React from 'react';
import { mount } from 'enzyme';

import { ValidatedInput } from '../ValidatedInput.jsx';
import { NestedForm } from '../NestedForm.jsx';
import { notEmpty, noop, formValidation, never, CustomValidation, success, error } from '../../validations';
import { Form } from '../../models';

describe('NestedForm', () => {
  set('form', () => new Form(formValidation));
  set('validation', () => noop);
  set('wrapper', () => mount(
    <NestedForm
      formosa_form={form}
      id='nestedForm'
      name='nested'
      validation={validation}
      errorsComponent={({errors}) => <div className="myErrors">{errors}</div>}
    >
      <ValidatedInput
        name='field'
        validation={notEmpty}
      />
    </NestedForm>),
  );
  describe('on mount', () => {
    it('reports up the correct validation status', () => {

      expect(form.isValid).toEqual(false);
    });
  });
  describe('after a subfield gets valid', () => {
    beforeEach(() => {
      wrapper.find('input')
        .simulate('change', {target: {value: 'hi'}});
    });
    it('reports up the correct validation status', () => {
      expect(form.isValid).toBe(true);
      expect(form.value).toEqual({nested: {field: 'hi'}});
    });
  });

  describe('Error messages', () => {
    describe('with a validation', () => {
      set('errorMessage', () => 'There is something wrong');
      set('validation', () =>
        new CustomValidation(({field}) =>
          field === 'hello' ? success(field) : error(errorMessage),
        ),
      );

      it('does not render the error message', () => {
        expect(wrapper.find('div.myErrors')).toHaveLength(0);
      });

      describe('after it was touched', () => {
        beforeEach(() => {
          wrapper.find('input').simulate('change', {target: {value: 'hi'}});
        });
        it('shows the error message', () => {
          expect(wrapper.find('div.myErrors').text()).toEqual(errorMessage);
        });
        describe('after its value gets valid', () => {
          beforeEach(() => {
            wrapper.find('input').simulate('change', {target: {value: 'hello'}});
          });
          it('shows no error message', () => {
            expect(wrapper.find('div.myErrors')).toHaveLength(0);
          });
        });
      });
    });
  });
});
