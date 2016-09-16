/*
 eslint-disable
 import/no-extraneous-dependencies,
 react/jsx-filename-extension,
 react/prop-types,
 */
import React from 'react';
import { shallow, mount } from 'enzyme';

import FieldArray from '../FieldArray';

const Component = () => (
  <div className="Component" />
);

describe('#FieldArray', () => {
  it('should not mount in a non-decorated component', () => {
    expect(() => shallow(
      <FieldArray
        name="test"
        component={Component}
      />,
    )).toThrowError(/FieldArray must be in a component decorated/);
  });
});
