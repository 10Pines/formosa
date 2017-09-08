import { notEmpty } from '../../validations';

describe('#notEmpty', () => {
  describe('with an empty input', () => {
    it('returns an error message', () => {
      expect(notEmpty('')).not.toBeNull();
    });
  });
  describe('with an some string', () => {
    it('returns null', () => {
      expect(notEmpty('some string')).toBeNull();
    });
  });
});
