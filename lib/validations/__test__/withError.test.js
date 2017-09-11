import { notEmpty } from '../../validations';

describe('#and', () => {
  describe('with invalid input', () => {
    it('returns the configured error message', () => {
      expect(notEmpty.withError('Some error')('')).toEqual('Some error');
    });
  });
  describe('with valid input', () => {
    it('returns with no errors', () => {
      expect(notEmpty.withError('Some error')('dwa')).toBeNull();
    });
  });
});
