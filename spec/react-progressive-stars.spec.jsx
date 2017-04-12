import React from 'react/addons';
import ReactProgressiveStars from '../lib/react-progressive-stars.jsx';

describe('ReactProgressiveStars', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactProgressiveStars/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-progressive-stars');
  });
});
