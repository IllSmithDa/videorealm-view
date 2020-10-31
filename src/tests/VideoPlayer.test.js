import React from 'react';
import { expect } from 'chai';
import { mount, configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from '../components/VideoPage/VideoPlayer';

configure({ adapter: new Adapter() });

describe('<VideoPlayer />', () => {
  it('should have a navbar in the webpage', () => {
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.find('Navbar')).to.have.length(1);
  });

  it('should have a video title h1 in the webpage', () => {
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should have a video the webpage', () => {
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.find('video')).to.have.length(1);
  });
});
