import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import R from 'ramda';
import invariant from 'invariant';

import { ARRAY_IGNORE_PROPS } from './utils/consts';

import contextShape from './utils/contextShape';


@observer
export default class FieldArray extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    // defaulted:
    flat: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    flat: false,
  };

  static contextTypes = {
    mobxForms: PropTypes.shape(contextShape).isRequired,
  };

  static childContextTypes = {
    mobxForms: PropTypes.shape(contextShape).isRequired,
  };

  getChildContext() {
    const { name, flat } = this.props;
    const { form, context } = this.context.mobxForms;

    return {
      form,
      context: context === '' ? name : `${context}.${name}`,
      flatArray: flat,
    };
  }

  componentWillMount() {
    const { name } = this.props;

    invariant(
      this.context.mobxForms,
      '[mobx-forms] FieldArray must be in a component decorated with "mobxForm"'
    );

    const { form, context } = this.context.mobxForms;

    form.addFieldArray(context, name);
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { form, context } = this.context.mobxForms;

    form.removeField(context, name);
  }

  render() {
    const { component, flat, ...rest } = this.props;
    const { form, context } = this.context.mobxForms;

    const fields = {
      map: (fn) => form.map(context, fn),
      push: () => form.push(context, flat ? null : {}),
      pop: () => form.pop(context),
      unshift: () => form.unshift(context, flat ? null : {}),
      shift: () => form.shift(context),
    };

    return React.createElement(component, R.merge(R.omit(ARRAY_IGNORE_PROPS, rest), {
      fields,
    }));
  }
}
