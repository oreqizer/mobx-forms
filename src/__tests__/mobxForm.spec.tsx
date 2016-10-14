/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { Provider } from 'mobx-react';
import { mount } from 'enzyme';

import mobxForm from '../mobxForm';
import FormsStore from "../FormsStore";

const MyComp = () => (
  <div className="Component" />
);

describe('#mobxForm', () => {
  it('should require name to be passed', () => {
    const fakeOpts: any = {};

    expect(() => mobxForm(fakeOpts)).toThrowError(/"form" is a required string/);
  });

  it('should mount an unnamed component correctly', () => {
    const Decorated = mobxForm({ form: 'test' })(MyComp);

    const decorated = mount(
      <Provider mobxForms={new FormsStore()}>
        <Decorated />
      </Provider>
    ).find(Decorated);

    expect(decorated.name()).toBe('MobxForm(Component)');
  });

  it('should name a component with a name correctly', () => {
    const Dummy: any = () => <MyComp />;

    Dummy.displayName = 'Dummy';

    const Decorated = mobxForm({ form: 'test' })(Dummy);

    const decorated = mount(
      <Provider mobxForms={new FormsStore()}>
        <Decorated />
      </Provider>
    ).find(Decorated);

    expect(decorated.name()).toBe('MobxForm(Dummy)');
  });

  it('should set up a form correctly', () => {
    const Decorated = mobxForm({ form: 'test' })(MyComp);

    const forms: any = new FormsStore();

    const wrapper = mount(
      <Provider mobxForms={forms}>
        <Decorated />
      </Provider>
    );

    expect(forms.forms.test).toBeDefined();

    wrapper.unmount();

    expect(forms.forms.test).toBeUndefined();
  });
});
