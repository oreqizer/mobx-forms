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
    type: PropTypes.string,
    validate: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  static contextTypes = {
    _mobxForm: PropTypes.instanceOf(FormStore).isRequired,
  };

  componentWillMount() {
    const { name, defaultValue, validate } = this.props;
    this.form = this.context._mobxForm; // eslint-disable-line no-underscore-dangle
    this.form.addField(name);
    this.field = this.form.fields[name];

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
    this.form.removeField(name);
  }

  handleChange(ev) {
    this.field.value = getValue(ev);
  }

  handleFocus() {
    this.field.active = true;
    this.field.touched = true;
  }

  handleBlur() {
    this.field.active = false;
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
