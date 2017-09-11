import { notEmpty, alpha } from '../../validations';

describe('#and', () => {
  describe('with valid input', () => {
    it('returns with no errors', () => {
      expect(notEmpty.and(alpha)('dsadsa')).toBeNull();
    });
  });
  describe('with invalid input for the first validator', () => {
    it('returns that error', () => {
      expect(notEmpty.and(alpha)('')).toEqual(`This field can't be empty`);
    });
  });
  describe('with invalid input for the second one', () => {
    it('returns the error for the second validator', () => {
      expect(notEmpty.and(alpha)('1321')).toEqual('This field should have only letters');
    });
  });
});
