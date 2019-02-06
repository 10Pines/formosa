import { notEmpty } from '../../validations';

describe('#otherwise', () => {
  describe('if the previous validation fails', () => {
    it('is valid with the default', () => {
      let validation = notEmpty.otherwise('default');

      expect(validation.validate('')).toEqual({
        isValid: true,
        value: 'default',
      });
    });
  });
  describe('if the previous validation successes', () => {
    it('returns the real value', () => {
      let validation = notEmpty.otherwise('default');

      expect(validation.validate('valid')).toEqual({
        isValid: true,
        value: 'valid',
      });
    });
  });
});
