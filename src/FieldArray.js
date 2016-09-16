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
    // optional:
    index: PropTypes.number,
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
    const { name, index, flat } = this.props;
    const { form, context } = this.context.mobxForms;

    return {
      mobxForms: {
        form,
        context: context === '' ? name : `${context}#${index}.${name}`,
        flatArray: flat,
      },
    };
  }

  componentWillMount() {
    const { name, index } = this.props;

    invariant(
      this.context.mobxForms,
      '[mobx-forms] FieldArray must be in a component decorated with "mobxForm"'
    );

    const { form, context, flatArray } = this.context.mobxForms;

    if (context === '') {
      invariant(
        !Number.isInteger(index),
        '[mobx-forms] "index" can only be passed to components inside ArrayField'
      );
    } else {
      invariant(
        Number.isInteger(index),
        '[mobx-forms] "index" must be passed to ArrayField components'
      );
    }

    this.pos = Number.isInteger(index) ? `${context}#${index}` : context;

    invariant(
      !flatArray,
      '[mobx-forms] FieldArray cannot be located within a flat FieldArray'
    );

    form.addFieldArray(this.pos, name);
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { form } = this.context.mobxForms;

    form.removeField(this.pos, name);
  }

  render() {
    const { component, flat, ...rest } = this.props;
    const { form } = this.context.mobxForms;

    const fields = {
      map: (fn) => form.map(this.pos, fn),
      push: () => form.push(this.pos, flat ? null : {}),
      pop: () => form.pop(this.pos),
      unshift: () => form.unshift(this.pos, flat ? null : {}),
      shift: () => form.shift(this.pos),
    };

    return React.createElement(component, R.merge(R.omit(ARRAY_IGNORE_PROPS, rest), {
      fields,
    }));
  }
}
