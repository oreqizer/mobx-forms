/*
eslint-disable
import/no-extraneous-dependencies,
react/jsx-filename-extension,
react/prop-types,
*/
import React from 'react';
import { shallow, mount } from 'enzyme';

import Field from '../Field';

import FormStore from '../containers/FormStore';

const rawMeta = {
  active: false,
  dirty: false,
  error: null,
  touched: false,
  visited: false,
};

const Component = props => (
  <div>
    <input type="text" {...props.input} />
  </div>
);

const getContext = (form, context) => ({
  context: {
    mobxForms: {
      form,
      context,
    },
  },
});

describe('#Field', () => {
  it('should not mount in a non-decorated component', () => {
    expect(() => shallow(
      <Field
        name="test"
        component={Component}
      />,
    )).toThrowError(/Field must be in a component decorated/);
  });

  it('should mount a basic string field', () => {
    const field = shallow(
      <Field
        name="test"
        component="input"
      />,
      getContext(new FormStore(), ''),
    );

    expect(field.name()).toBe('input');
    expect(field.prop('name')).toBe('test');
    expect(field.prop('value')).toBeDefined();
    expect(field.prop('onChange')).toBeDefined();
    expect(field.prop('onFocus')).toBeDefined();
    expect(field.prop('onBlur')).toBeDefined();
    expect(field.prop('input')).toBeUndefined();
    expect(field.prop('meta')).toBeUndefined();
  });

  it('should mount a basic component field', () => {
    const field = shallow(
      <Field
        name="test"
        component={Component}
      />,
      getContext(new FormStore(), ''),
    );

    expect(field.name()).toBe('Component');
    expect(field.prop('input').name).toBe('test');
    expect(field.prop('input').value).toBe('');
    expect(field.prop('input').onChange).toBeDefined();
    expect(field.prop('input').onFocus).toBeDefined();
    expect(field.prop('input').onBlur).toBeDefined();
    expect(field.prop('meta')).toEqual(rawMeta);
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

  it('should unmount a basic field', () => {
    const form = new FormStore();
    const field = mount(
      <Field
        name="test"
        component="input"
      />,
      getContext(form, ''),
    );

    expect(form.fields.test).toBeDefined();

    field.unmount();

    expect(form.fields.test).toBeUndefined();
  });

  it('should unmount an array field', () => {
    const form = new FormStore();
    form.addFieldArray('', 'array');
    form.push('array', {});

    const field = mount(
      <Field
        name="test"
        index={0}
        component="input"
      />,
      getContext(form, 'array'),
    );

    expect(form.fields.array[0].test).toBeDefined();

    field.unmount();

    expect(form.fields.array[0].test).toBeUndefined();
  });

  it('should not mount an indexed field without an array', () => {
    const form = new FormStore();

    expect(() => shallow(
      <Field
        name="test"
        index={0}
        component={Component}
      />,
      getContext(form, ''),
    )).toThrowError(/"index" is a reserved property/);
  });

  it('should handle an onChange on a basic field', () => {
    const field = mount(
      <Field
        name="test"
        component="input"
      />,
      getContext(new FormStore(), ''),
    );

    expect(field.find('input').prop('value')).toBe('');

    field.find('input').simulate('change', { target: { value: 'doge' } });

    expect(field.find('input').prop('value')).toBe('doge');
  });

  it('should handle an onChange on a component field', () => {
    const field = mount(
      <Field
        name="test"
        component={Component}
      />,
      getContext(new FormStore(), ''),
    );

    expect(field.find(Component).prop('input').value).toBe('');
    expect(field.find(Component).prop('meta')).toEqual(rawMeta);

    field.find('input').simulate('change', { target: { value: 'doge' } });

    expect(field.find(Component).prop('input').value).toBe('doge');
    expect(field.find(Component).prop('meta')).toEqual({
      active: false,
      dirty: true,
      error: null,
      touched: false,
      visited: false,
    });
  });

  it('should handle an onFocus on a component field', () => {
    const field = mount(
      <Field
        name="test"
        component={Component}
      />,
      getContext(new FormStore(), ''),
    );

    expect(field.find(Component).prop('meta')).toEqual(rawMeta);

    field.find('input').simulate('focus');

    expect(field.find(Component).prop('meta')).toEqual({
      active: true,
      dirty: false,
      error: null,
      touched: false,
      visited: true,
    });
  });

  it('should handle an onBlur on a component field', () => {
    const field = mount(
      <Field
        name="test"
        component={Component}
      />,
      getContext(new FormStore(), ''),
    );

    expect(field.find(Component).prop('meta')).toEqual(rawMeta);

    field.find('input').simulate('focus');
    field.find('input').simulate('blur');

    expect(field.find(Component).prop('meta')).toEqual({
      active: false,
      dirty: false,
      error: null,
      touched: true,
      visited: true,
    });
  });
});
