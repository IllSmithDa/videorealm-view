import React from 'react';
import { expect } from 'chai';
import { mount, configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Navbar.prototype, 'componentWillMount');
    const wrapper = mount(<Navbar />);
    expect(Navbar.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  it('allows us to set props', () => {
    const wrapper = mount(<Navbar bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });

  it('should have four buttons', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('button')).to.have.length(4);
  });

  it('should have 2 image buttons', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('img')).to.have.length(2);
  });

  it('should have 1 search input', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('input')).to.have.length(1);
  });
});
