import React, { Component, PropTypes } from 'react';
import R from 'ramda';

export default class FieldArray extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    // ---
    flat: PropTypes.bool,
  };

  static contextTypes = {
    mobxForms: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    mobxForms: PropTypes.object.isRequired,
  };

  getChildContext() {
    const { name } = this.props;
    const { form, context } = this.context.mobxForms;

    return {
      form,
      context: `${context}.${name}`,
    };
  }

  componentWillMount() {
    const { name } = this.props;
    const { form, context } = this.context.mobxForms;

    form.addFieldArray(name, context);
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { form, context } = this.context.mobxForms;

    form.removeField(name, context);
  }

  render() {
    const { component, name, flat, ...rest } = this.props;
    const { form, context } = this.context.mobxForms;

    const fields = {
      map: (fn) => form.map(context, fn),
      push: () => flat ? form.push(context, name) : form.pushDeep(context),
      pop: () => form.pop(context),
      unshift: () => flat ? form.unshift(context, name) : form.unshiftDeep(context),
      shift: () => form.shift(context),
    };

    return React.createElement(component, R.merge(rest, {
      fields,
    }));
  }
}
