import React from 'react';
import { expect } from 'chai';
import { mount, configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import CommentList from '../components/CommentSection/CommentList';

configure({ adapter: new Adapter() });

describe('<CommentList />', () => {
  it('should have a comment textarea in the webpage', () => {
    const wrapper = shallow(<CommentList />);
    expect(wrapper.find('textarea')).to.have.length(1);
  });

  it('should have a comment title in the webpage', () => {
    const wrapper = shallow(<CommentList />);
    expect(wrapper.find('h4')).to.have.length(1);
  });

  it('should have a submit button in the webpage', () => {
    const wrapper = shallow(<CommentList />);
    expect(wrapper.find('button')).to.have.length(1);
  });
});
