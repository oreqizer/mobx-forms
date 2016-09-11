import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import R from 'ramda';

import FormStore from './containers/FormStore';

import prepareProps from './utils/prepareProps';
import getValue from './utils/getValue';

@observer
export default class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    // ---
    validate: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  static contextTypes = {
    mobxForms: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { name, defaultValue, validate } = this.props;
    const { form, context } = this.context.mobxForms;

    form.addField(name, context);
    this.field = form.fields[name];

    if (defaultValue) {
      this.field.value = defaultValue;
      this.field.defaultValue = defaultValue;
    }

    if (validate) {
      this.field.validate = validate;
    }
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { form, context } = this.context.mobxForms;
    form.removeField(name, context);
  }

  handleChange(ev) {
    this.field.value = getValue(ev);
  }

  handleFocus() {
    this.field.active = true;
    this.field.visited = true;
  }

  handleBlur() {
    this.field.active = false;
    this.field.touched = true;
  }

  render() {
    const { component, ...props } = this.props;

    props.onChange = ev => this.handleChange(ev);
    props.onFocus = ev => this.handleFocus(ev);
    props.onBlur = ev => this.handleBlur(ev);

    const { input, meta, custom } = prepareProps(R.merge(props, this.field.props));

    if (typeof component === 'string') {
      return React.createElement(component, R.merge(custom, input));
    }

    return React.createElement(component, R.merge(custom, { input, meta }));
  }
}
