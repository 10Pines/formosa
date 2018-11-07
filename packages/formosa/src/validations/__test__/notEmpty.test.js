import { notEmpty } from '../../validations';

describe('#notEmpty', () => {
  describe('with an empty input', () => {
    it('returns an error message', () => {
      expect(notEmpty.validate('')).toHaveProperty('isValid', false);
    });
  });
  describe('with an some string', () => {
    it('returns null', () => {
      expect(notEmpty.validate('some string')).toHaveProperty('isValid', true);
    });
  });
});
