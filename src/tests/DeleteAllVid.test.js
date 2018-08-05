import React from 'react';
import { expect } from 'chai';
import { mount, configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import DeleteAllVid from '../components/DeleteAllVid';

configure({ adapter: new Adapter() });

describe('<DeleteAllVid />', () => {
  it('should have a title in the component', () => {
    const wrapper = shallow(<DeleteAllVid />);
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should have a span close button inputs in the delete moal', () => {
    const wrapper = shallow(<DeleteAllVid />);
    expect(wrapper.find('span')).to.have.length(1);
  });

  it('should have 2 buttons total in the webpage', () => {
    const wrapper = shallow(<DeleteAllVid />);
    expect(wrapper.find('button')).to.have.length(2);
  });
});
