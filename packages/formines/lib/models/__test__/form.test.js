import { Form, Field } from '../';
import { notEmpty, formValidation } from '../../validations';

describe('form', () => {
  set('form', () => new Form(formValidation));
  subject(() => form);

  describe('with one valid field registered', () => {

    set('field', () => new Field(notEmpty, 'hi'));

    beforeEach(() => {
      form.registerField('someName', field);
    });

    its('isValid', () => isExpected.toBe(true));

    describe('after I unregister that field', () => {
      beforeEach(() => field.delete());
      it('becomes invalid', () => {
        expect(form.value).toEqual(undefined);
      });
    });
  });

  describe('with one invalid field registered', () => {
    set('field', () => new Field(notEmpty, ''));
    beforeEach(() => {
      form.registerField('someName', field);
    });

    its('isValid', () => isExpected.toBe(false));

    describe('after updating the field to be valid', () => {
      beforeEach(() => { field.input = 'hi'; });

      its('isValid', () => isExpected.toBe(true));
    });
  });
});
