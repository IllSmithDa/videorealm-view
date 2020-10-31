import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from './HomePage';

test('Should match snapshot', () => {
  const component = renderer.create(
    <HomePage />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.getQueryResponse();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
