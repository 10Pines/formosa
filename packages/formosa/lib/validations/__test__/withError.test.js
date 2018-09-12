import { notEmpty } from '../../validations';

describe('#and', () => {
  describe('with invalid input', () => {
    it('returns the configured error message', () => {
      expect(notEmpty.withError('Some error').validate('')).toHaveProperty('errorMessage', 'Some error');
    });
  });
  describe('with valid input', () => {
    it('returns with no errors', () => {
      expect(notEmpty.withError('Some error').validate('dwa')).toHaveProperty('isValid', true);
    });
  });
});
