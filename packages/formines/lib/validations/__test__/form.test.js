import { formValidation, success, error } from '../../validations';

describe('#formValidation', () => {
  describe('with no field', () => {
    it('it is not valid', () => {
      expect(formValidation.validate(new Map())).toHaveProperty('isValid', false);
    });
  });
  describe('with one valid field', () => {
    it('it is valid', () => {
      const values = new Map([
          ['language', success('haskell')]
      ]);
      expect(formValidation.validate(values)).toHaveProperty('isValid', true);
      expect(formValidation.validate(values)).toHaveProperty('value', {
        language: 'haskell'
      });
    });
  });
  describe('with one invalid field', () => {
    it('it is not valid', () => {
      const values = new Map([
          ['language', success('haskell')],
          ['paradigm', error('This is empty')]
      ]);
      expect(formValidation.validate(values)).toHaveProperty('isValid', false);
    });
  });
  describe('with more than one valid field', () => {
    it('it is valid', () => {
      const values = new Map([
          ['language', success('haskell')],
          ['grade', success(7)]
      ]);
      expect(formValidation.validate(values)).toHaveProperty('isValid', true);
      expect(formValidation.validate(values)).toHaveProperty('value', {
        language: 'haskell',
        grade: 7
      });
    });
  });
});
