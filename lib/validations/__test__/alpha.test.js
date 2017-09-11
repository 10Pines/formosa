import { alpha } from '../../validations';

describe('#noop', () => {
  describe('with valid input', () => {
    it('returns ok', () => {
      expect(alpha('dsa')).toBeNull();
    });
  });
  describe('with invalid input', () => {
    it('returns an error message', () => {
      expect(alpha('09')).toEqual('This field should have only letters');
    });
  });
  describe('with uppercase input', () => {
    it('returns ok', () => {
      expect(alpha('DSA')).toBeNull();
    });
  });
});
