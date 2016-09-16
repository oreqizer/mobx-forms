import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import R from 'ramda';

import FieldStore from './containers/FieldStore';

import prepareProps from './utils/prepareProps';
import getValue from './utils/getValue';


@observer
export default class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    // ---
    validate: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
  };

  static defaultProps = {
    validate: () => null,
    defaultValue: '',
  };

  static contextTypes = {
    mobxForms: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { name, defaultValue, validate } = this.props;
    const { form, context } = this.context.mobxForms;

    this.field = new FieldStore({
      name,
      defaultValue,
      validate,
    });

    form.addField(context, name, this.field);
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { form, context } = this.context.mobxForms;

    form.removeField(context, name);
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
