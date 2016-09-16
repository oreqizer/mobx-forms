/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';

import Field from '../Field';

import FormStore from '../containers/FormStore';

const Component = props => <div {...props} />;

const getContext = (form, context) => ({
  context: {
    mobxForms: {
      form,
      context,
    },
  },
});

describe('#Field', () => {
  it('should mount a basic field', () => {
    const field = shallow(
      <Field
        name="test"
        component={Component}
      />,
      getContext(new FormStore(), ''),
    );

    expect(field.name()).toBe('Component');
    expect(field.context('mobxForms').context).toBe('');
    expect(field.context('mobxForms').form.fields.test).toBeDefined();
    expect(field.prop('input')).toBeDefined();
    expect(field.prop('meta')).toEqual({
      active: false,
      dirty: false,
      error: null,
      touched: false,
      visited: false,
    });
  });

  it('should mount an array field', () => {
    const form = new FormStore();
    form.addFieldArray('', 'array');
    form.push('array', {});

    const field = shallow(
      <Field
        name="test"
        index={0}
        component={Component}
      />,
      getContext(form, 'array'),
    );

    expect(field.context('mobxForms').form.fields.array[0].test).toBeDefined();
  });
});
