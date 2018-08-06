import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

require('jest-plugins')([
  // List all jest-plugins here.
  'jest-plugin-set',
  'jest-plugin-action',
  'jest-plugin-its',
]);
