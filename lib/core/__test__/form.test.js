import { Form } from '../form';
import { Field } from '../field';
import { notEmpty } from '../../validations';

describe('form', () => {
  describe('with one invalid field registered', () => {
    it('is invalid', () => {
      let form = new Form();

      form.registerField('someName', new Field('', notEmpty));

      expect(form.isValid()).toBe(false);
    });
  });
  describe('with one valid field registered', () => {
    it('is invalid', () => {
      let form = new Form();

      form.registerField('someName', new Field('lele', notEmpty));

      expect(form.isValid()).toBe(true);
    });
  });
  describe('after the input becomes valid', () => {
    it('is valid', () => {
      let form = new Form();
      const fieldNotifier = form.registerField('someName', new Field('', notEmpty));

      fieldNotifier(new Field('value', notEmpty));

      expect(form.isValid()).toBe(true);
    });
  });
});
