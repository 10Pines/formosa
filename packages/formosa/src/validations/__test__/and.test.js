import { notEmpty, alpha } from '../../validations';

describe('#and', () => {
  describe('with valid input', () => {
    it('returns with no errors', () => {
      expect(notEmpty.and(alpha).validate('dsadsa')).toHaveProperty('isValid', true);
    });
  });
  describe('with invalid input for the first validator', () => {
    it('returns that error', () => {
      expect(notEmpty.and(alpha).validate('')).toHaveProperty('errorMessage', `This field can't be empty`);
    });
  });
  describe('with invalid input for the second one', () => {
    it('returns the error for the second validator', () => {
      expect(notEmpty.and(alpha).validate('1321')).toHaveProperty('errorMessage', 'This field should have only letters');
    });
  });
});
