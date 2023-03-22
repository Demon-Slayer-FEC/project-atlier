import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../Search';

it('test to see if the search componenet renders correctly', () => {
  const search = renderer.create(<Search />).toJSON();
  expect(search).toMatchSnapshot();
});