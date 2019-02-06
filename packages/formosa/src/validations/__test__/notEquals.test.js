import { notEquals } from '../../validations';

describe('#notEquals', () => {
  describe('with equal values', () => {
    it('is invalid', () => {
      expect(notEquals(7).validate(7)).toHaveProperty('isValid', false);
    });
  });
  describe('with different values', () => {
    it('is valid', () => {
      expect(notEquals(7).validate(0)).toHaveProperty('isValid', true);
    });
  });
});
