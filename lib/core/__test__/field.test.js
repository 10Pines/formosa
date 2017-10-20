import { Field } from '../field';
import { notEmpty } from '../../validations';

describe('field', () => {
  describe('with an invalid input', () => {
    let field = new Field('', notEmpty.withError('Some error'));
    it(`is invalid if it's value is not valid`, () => {
      expect(field.isValid()).toBe(false);
    });
    it(`has the correct error message`, () => {
      expect(field.getError()).toEqual('Some error');
    });
  });
  describe('with a transformation', () => {
    let field = new Field('', notEmpty.withError('Some error'));
    it(`has the correct error message`, () => {
      expect(field.getError()).toEqual('Some error');
    });
  });
});
