import { noop } from '../../validations';

describe('#noop', () => {
  describe('with any input', () => {
    it('returns an error message', () => {
      expect(noop('dsadsa')).toBeNull();
    });
  });
});
