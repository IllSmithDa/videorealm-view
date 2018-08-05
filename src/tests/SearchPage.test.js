import React from 'react';
import { expect } from 'chai';
import { mount, configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import SearchPage from '../components/SearchPage';

configure({ adapter: new Adapter() });

describe('<SearchPage />', () => {
  it('should have a navbar in the component', () => {
    const wrapper = shallow(<SearchPage />);
    expect(wrapper.find('Navbar')).to.have.length(1);
  });

  it('should have a header in the webpage', () => {
    const wrapper = shallow(<SearchPage />);
    expect(wrapper.find('h2')).to.have.length(1);
  });
});
