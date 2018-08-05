import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/Login';

configure({ adapter: new Adapter() });
const wrapper = shallow(<Login />);

describe('<Login />', () => {
  it('should have a header in the webpage', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });
});

describe('<Login />', () => {
  it('should have a Navbar in the webpage', () => {
    expect(wrapper.find('Navbar')).to.have.length(1);
  });
});

describe('<Login />', () => {
  it('should have a two inputs in the webpage', () => {
    expect(wrapper.find('input')).to.have.length(2);
  });
});

describe('<Login />', () => {
  it('should have a warning <p> in the webpage', () => {
    expect(wrapper.find('p')).to.have.length(1);
  });
});


describe('<Login />', () => {
  it('should have a submit button in the webpage', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
});
