import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { ValidatedInput } from '../ValidatedInput';
import { Form } from '../Form';
import { notEmpty, noop } from '../../validations';

describe('Form', () => {
  describe('when a submit button is pressed', () => {
    it('calls onSubmit', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(<Form onSubmit={onSubmit}>
        <button type="submit" />
      </Form>);

      wrapper.find('button').get(0).click();

      expect(onSubmit).toBeCalled();
    });
  });
  describe('when it has an invalid element', () => {
    it('is not valid', () => {
      let validChanges = [];
      const onSubmit = jest.fn();
      const onInvalid = () => validChanges.push(false);
      const onValid = () => validChanges.push(true);
      mount(
        <Form 
          onInvalid={onInvalid}
          onSubmit={onSubmit}
          onValid={onValid}
        >
          <ValidatedInput 
            name="field" 
            validation={notEmpty} 
          />
        </Form>);

      expect(validChanges).toEqual([false]);
    });
  });
  describe('when it has a valid element', () => {
    it('is valid', () => {
      let validChanges = [];
      const onSubmit = jest.fn();
      const onInvalid = () => validChanges.push(false);
      const onValid = () => validChanges.push(true);
      mount(
        <Form 
          onInvalid={onInvalid}
          onSubmit={onSubmit}
          onValid={onValid}
        >
          <ValidatedInput 
            name="field"
            validation={noop} 
          />
        </Form>);

      expect(validChanges).toEqual([true]);
    });
  });
  describe('when it has valid and invalid elements', () => {
    it('is not valid', () => {
      let isValid = null;
      const onSubmit = jest.fn();
      const onInvalid = () => isValid = false;
      const onValid = () => isValid = true;
      mount(
        <Form 
          onInvalid={onInvalid}
          onSubmit={onSubmit}
          onValid={onValid}
        >
          <ValidatedInput 
            name="field"
            validation={noop} 
          />
          <ValidatedInput 
            name="otherField"
            validation={notEmpty} 
          />
        </Form>);

      expect(isValid).toBe(false);
    });
  });
});
