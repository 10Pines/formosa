export const noop = (input) => null;

export const notEmpty = 
  (input) => input === '' ? `This field can't be empty` : null;
