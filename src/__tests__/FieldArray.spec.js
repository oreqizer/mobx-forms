/*
 eslint-disable
 import/no-extraneous-dependencies,
 react/jsx-filename-extension,
 react/prop-types,
 */
import React from 'react';
import { shallow, mount } from 'enzyme';

import FieldArray from '../FieldArray';

import FormStore from '../containers/FormStore';

const Component = () => (
  <div className="Component" />
);

const getContext = (form, context, flatArray) => ({
  context: {
    mobxForms: {
      form,
      context,
      flatArray,
    },
  },
});

describe('#FieldArray', () => {
  it('should not mount in a non-decorated component', () => {
    expect(() => shallow(
      <FieldArray
        name="test"
        component={Component}
      />,
    )).toThrowError(/FieldArray must be in a component decorated/);
  });

  it('should not mount inside a flat FieldArray', () => {
    expect(() => shallow(
      <FieldArray
        name="test"
        component={Component}
      />,
      getContext(new FormStore(), '', true),
    )).toThrowError(/FieldArray cannot be located within a flat/);
  });

  it('should mount a flat FieldArray', () => {
    const context = getContext(new FormStore(), '', false);
    const array = shallow(
      <FieldArray
        name="test"
        component={Component}
        flat
      />,
      context,
    );

    const childContext = array.instance().getChildContext();
    expect(childContext.mobxForms.form).toBe(context.context.mobxForms.form);
    expect(childContext.mobxForms.context).toBe('test');
    expect(childContext.mobxForms.flatArray).toBe(true);
  });

  it('should mount a deep FieldArray', () => {
    const context = getContext(new FormStore(), '', false);
    const array = shallow(
      <FieldArray
        name="test"
        component={Component}
      />,
      context,
    );

    const childContext = array.instance().getChildContext();
    expect(childContext.mobxForms.form).toBe(context.context.mobxForms.form);
    expect(childContext.mobxForms.context).toBe('test');
    expect(childContext.mobxForms.flatArray).toBe(false);
  });

  it('should mount a FieldArray a level deep', () => {
    const form = new FormStore();
    form.addFieldArray('', 'deep');
    form.push('deep', {});

    const context = getContext(form, 'deep', false);
    const array = shallow(
      <FieldArray
        name="test"
        index={0}
        component={Component}
      />,
      context,
    );

    const childContext = array.instance().getChildContext();
    expect(childContext.mobxForms.form).toBe(context.context.mobxForms.form);
    expect(childContext.mobxForms.context).toBe('deep#0.test');
    expect(childContext.mobxForms.flatArray).toBe(false);
  });

  it('should mount a FieldArray two levels deep', () => {
    const form = new FormStore();
    form.addFieldArray('', 'deep');
    form.push('deep', {});
    form.addFieldArray('deep#0', 'nested');
    form.push('deep#0.nested', {});

    const context = getContext(form, 'deep#0.nested', false);
    const array = shallow(
      <FieldArray
        name="test"
        index={0}
        component={Component}
      />,
      context,
    );

    const childContext = array.instance().getChildContext();
    expect(childContext.mobxForms.form).toBe(context.context.mobxForms.form);
    expect(childContext.mobxForms.context).toBe('deep#0.nested#0.test');
    expect(childContext.mobxForms.flatArray).toBe(false);
  });

  it('should unmount a FieldArray', () => {
    const form = new FormStore();
    form.addFieldArray('', 'deep');
    form.push('deep', {});

    const context = getContext(form, 'deep', false);
    const array = mount(
      <FieldArray
        name="test"
        index={0}
        component={Component}
      />,
      context,
    );

    expect(form.fields.deep[0].test).toBeDefined();
    array.unmount();
    expect(form.fields.deep[0].test).toBeUndefined();
    expect(form.fields.deep[0]).toEqual({});
  });
});
