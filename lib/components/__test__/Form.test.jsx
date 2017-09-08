import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { Form } from '../Form';

describe('Form', () => {
  it('Is rendered', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Form onSubmit={onSubmit}>
      <button type="submit" />
    </Form>);

    wrapper.find('button').simulate('click');

    expect(onSubmit).toBeCalled();
  });
});
