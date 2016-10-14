/*
 eslint-disable
 import/no-extraneous-dependencies,
 react/jsx-filename-extension,
 react/prop-types,
 */
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as R from 'ramda';

import FieldArray from '../FieldArray';

import FormStore from '../containers/FormStore';
import FieldStore from '../containers/FieldStore';

const Component = () => (
  <div className="Component" />
);

const getContext = (form: FormStore, context: string, flatArray: boolean) => ({
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

  it('should mount a basic FieldArray', () => {
    const context = getContext(new FormStore(), '', false);
    const array: any = shallow(
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
    expect(array.props().fields.map).toBeDefined();
    expect(array.props().fields.push).toBeDefined();
    expect(array.props().fields.pop).toBeDefined();
    expect(array.props().fields.unshift).toBeDefined();
    expect(array.props().fields.shift).toBeDefined();
  });

  it('should mount a deep FieldArray', () => {
    const context = getContext(new FormStore(), '', false);
    const array: any = shallow(
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

  it('should not mount a flat FieldArray with an index', () => {
    expect(() => shallow(
      <FieldArray
        name="test"
        index={0}
        component={Component}
      />,
      getContext(new FormStore(), '', true),
    )).toThrowError(/"index" can only be passed to components inside/);
  });

  it('should not mount a deep FieldArray without an index', () => {
    expect(() => shallow(
      <FieldArray
        name="test"
        component={Component}
      />,
      getContext(new FormStore(), 'deep', true),
    )).toThrowError(/"index" must be passed to ArrayField/);
  });

  it('should mount a FieldArray a level deep', () => {
    const form = new FormStore();
    form.addFieldArray('', 'deep');
    form.push('deep');

    const context = getContext(form, 'deep', false);
    const array: any = shallow(
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
    form.push('deep');
    form.addFieldArray('deep#0', 'nested');
    form.push('deep#0.nested');

    const context = getContext(form, 'deep#0.nested', false);
    const array: any = shallow(
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
    const form: any = new FormStore();
    form.addFieldArray('', 'deep');
    form.push('deep');

    const array = mount(
      <FieldArray
        name="test"
        index={0}
        component={Component}
      />,
      getContext(form, 'deep', false),
    );

    expect(form.fields.deep[0].test).toBeDefined();
    array.unmount();
    expect(form.fields.deep[0].test).toBeUndefined();
    expect(form.fields.deep[0]).toEqual({});
  });

  it('should supply working functions in a flat FieldArray', () => {
    const form: any = new FormStore();

    const array = shallow(
      <FieldArray
        name="test"
        component={Component}
        flat
      />,
      getContext(form, '', false),
    );

    const { fields } = array.props();
    expect(form.fields.test).toBeDefined();

    fields.push();
    expect(form.fields.test.length).toBe(1);
    expect(form.fields.test[0]).toEqual({});

    form.addFieldIndex('test', 0, new FieldStore());
    fields.unshift();
    expect(form.fields.test.length).toBe(2);
    expect(form.fields.test[0]).toEqual({});

    expect(fields.map(R.identity)).toEqual([0, 1]);

    fields.pop();
    expect(form.fields.test.length).toBe(1);
    expect(form.fields.test[0]).toEqual({});

    fields.shift();
    expect(form.fields.test.length).toBe(0);
  });

  it('should supply working functions in a deep FieldArray', () => {
    const form: any = new FormStore();

    const array = shallow(
      <FieldArray
        name="test"
        component={Component}
      />,
      getContext(form, '', false),
    );

    const { fields } = array.props();
    expect(form.fields.test).toBeDefined();

    fields.push();
    expect(form.fields.test.length).toBe(1);
    expect(form.fields.test[0]).toEqual({});

    form.addField('test#0', 'field', new FieldStore());
    fields.unshift();
    expect(form.fields.test.length).toBe(2);
    expect(form.fields.test[0]).toEqual({});

    expect(fields.map(R.identity)).toEqual([0, 1]);

    fields.pop();
    expect(form.fields.test.length).toBe(1);
    expect(form.fields.test[0]).toEqual({});

    fields.shift();
    expect(form.fields.test.length).toBe(0);
  });
});
