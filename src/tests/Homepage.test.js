import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from '../components/HomePage/HomePage';

configure({ adapter: new Adapter() });
const wrapper = shallow(<HomePage />);

describe('<HomePage />', () => {
  it('should have a Navbar in the webpage', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });
});

describe('<HomePage />', () => {
  it('should have 3 div tags in the webpage', () => {
    expect(wrapper.find('div')).to.have.length(3);
  });
});

describe('<HomePage />', () => {
  it('should have 2 h1 tags in the webpage', () => {
    expect(wrapper.find('h1')).to.have.length(2);
  });
});
