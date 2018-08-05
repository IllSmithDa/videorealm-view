import React from 'react';
import { expect } from 'chai';
import { mount, configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import CreateUser from '../components/CreateUser';

configure({ adapter: new Adapter() });

describe('<CreateUser />', () => {
  it('should have a Navbar in the webpage', () => {
    const wrapper = shallow(<CreateUser />);
    expect(wrapper.find('Navbar')).to.have.length(1);
  });

  it('should have a 4 inputs in the webpage', () => {
    const wrapper = shallow(<CreateUser />);
    expect(wrapper.find('input')).to.have.length(4);
  });

  it('should have a submit button in the webpage', () => {
    const wrapper = shallow(<CreateUser />);
    expect(wrapper.find('button')).to.have.length(1);
  });
});
