import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Stars } from '../lib/index';


describe('Stars', function() {
  it('should render default stars component if not properties are setted', function() {
    const wrapper = mount(<Stars />);

    expect(wrapper.find('.stars__star').not('.stars__star--active')).to.have.length(5);
  });

  it('should render with active stars if exist', function() {
    const wrapper = mount(<Stars value={3} />);

    expect(wrapper.find('.stars__star--active')).to.have.length(3);
    expect(wrapper.find('.stars__star').not('.stars__star--active')).to.have.length(2);
  });
});
