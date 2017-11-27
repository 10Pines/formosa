import { alpha } from '../../validations';

describe('#noop', () => {
  describe('with valid input', () => {
    it('returns ok', () => {
      expect(alpha.validate('dsa')).toHaveProperty('isValid', true);
    });
  });
  describe('with invalid input', () => {
    it('returns an error message', () => {
      expect(alpha.validate('09')).toHaveProperty('errorMessage', 'This field should have only letters');

    });
  });
  describe('with uppercase input', () => {
    it('returns ok', () => {
      expect(alpha.validate('DSA')).toHaveProperty('isValid', true);
    });
  });
});
