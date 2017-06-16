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

  it('should render with progressive stars if the value is a decimal', function() {
    const wrapper = mount(<Stars value={3.4} />);

    expect(wrapper.find('.stars__star--active')).to.have.length(3);
    expect(wrapper.find('.stars__star').at(3).children().at(0).type()).to.be.equal('style');
    expect(wrapper.find('.stars__star').at(4).hasClass('stars__star--')).to.be.equal(false);
  });

  it('should disable click event if it is rendered as readonly component', function() {
    var onChange = sinon.spy();
    const wrapper = mount(<Stars value={3} edit={false} onChange={onChange} />);

    wrapper.find('.stars__star').at(0).simulate('click', { preventDefault() {} });
     expect(onChange.called).to.equal(false);
  });

  it('should enable click event if it is rendered as editable component', function() {
    var onChange = sinon.spy();
    const wrapper = mount(<Stars value={3} edit={true} onChange={onChange} />);

    wrapper.find('.stars__star').at(0).simulate('click', { preventDefault() {} });
     expect(onChange.called).to.equal(true);
  });
});
