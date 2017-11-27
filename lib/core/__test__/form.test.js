import { Form, Field } from '../';
import { success, error, notEmpty, formValidation } from '../../validations';
import { observable } from 'mobx';

describe('form', () => {
  let form;
  beforeEach(() => {
    form = new Form(formValidation);
  });

  describe('with one valid field registered', () => {
    let field;
    beforeEach(() => {
      field = new Field(notEmpty, 'hi');
      form.registerField('someName', field);
    });

    it('is valid', () => {

      expect(form.isValid).toBe(true);
    });

    describe('after I unregister that field', () => {
      beforeEach(() => {
        field.delete();
      });

      it('removes that value from the form', () => {
        expect(form.value).toEqual(undefined);
      });
    });
  });

  describe('with one invalid field registered', () => {
    let field;
    beforeEach(() => {
      field = new Field(notEmpty, '' );
      form.registerField('someName', field);
    });

    it('is invalid', () => {
      expect(form.isValid).toBe(false);
    });

    describe('after updating the field to be valid', () => {
      beforeEach(() => { field.input = 'hi'; });

      it('becomes valid', () => {
        expect(form.isValid).toBe(true);
      });
    });
  });
});
