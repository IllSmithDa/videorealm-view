import React from 'react';
import { expect } from 'chai';
import { mount, configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Errorpage from '../components/Errorpage';

configure({ adapter: new Adapter() });

describe('<Errorpage />', () => {
  it('should have a navbar in the component', () => {
    const wrapper = shallow(<Errorpage />);
    expect(wrapper.find('Navbar')).to.have.length(1);
  });

  it('should have 2 div tags total in the webpage', () => {
    const wrapper = shallow(<Errorpage />);
    expect(wrapper.find('div')).to.have.length(2);
  });
});
