import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import R from 'ramda';

import FieldStore from './containers/FieldStore';

import { ARRAY_IGNORE_PROPS } from './utils/consts';


@observer
export default class FieldArray extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    // default:
    validate: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
    // optional:
    flat: PropTypes.bool,
  };

  static defaultProps = {
    validate: () => null,
    defaultValue: '',
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

    form.addFieldArray(context, name);
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { form, context } = this.context.mobxForms;

    form.removeField(context, name);
  }

  getNewField() {
    const { name, validate, defaultValue } = this.props;

    return new FieldStore({
      name,
      validate,
      defaultValue,
    });
  }

  render() {
    const { component, flat, ...rest } = this.props;
    const { form, context } = this.context.mobxForms;

    const fields = {
      map: (fn) => form.map(context, fn),
      push: () => form.push(context, flat ? this.getNewField() : {}),
      pop: () => form.pop(context),
      unshift: () => form.unshift(context, flat ? this.getNewField() : {}),
      shift: () => form.shift(context),
    };

    return React.createElement(component, R.merge(R.omit(ARRAY_IGNORE_PROPS, rest), {
      fields,
    }));
  }
}
