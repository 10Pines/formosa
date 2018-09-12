import { alpha } from '../../validations';
import { CustomValidation, error, success } from '../index';

const aError = `Should start with a`;
const a = new CustomValidation((name) => name.startsWith('a')  ? success(name) : error(aError));

const bError = `Should end with b`;
const b = new CustomValidation((name) => name.endsWith('b')  ? success(name) : error(bError));

describe('#or', () => {
  subject(() => (a.or(b)).validate(input));
  describe('with invalid input', () => {
    set('input', () => '');

    its('isValid', () => isExpected.toEqual(false));
    its('errorMessage', () => isExpected.toEqual(bError));
  });
  describe('with valid input for the first validator', () => {
    set('input', () => 'a');

    its('isValid', () => isExpected.toEqual(true));
  });
  describe('with valid input for the second one', () => {
    set('input', () => 'b');
    its('isValid', () => isExpected.toEqual(true));
  });
  describe('with valid input for both validators', () => {
    set('input', () => 'ab');

    its('isValid', () => isExpected.toEqual(true));
  });
});
