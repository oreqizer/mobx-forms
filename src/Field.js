import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import R from 'ramda';
import invariant from 'invariant';

import FieldStore from './containers/FieldStore';

import prepareProps from './utils/prepareProps';
import getValue from './utils/getValue';

import contextShape from './utils/contextShape';


@observer
export default class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    // default:
    validate: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
    // optional:
    index: PropTypes.number,
  };

  static defaultProps = {
    validate: () => null,
    defaultValue: '',
  };

  static contextTypes = {
    mobxForms: PropTypes.shape(contextShape).isRequired,
  };

  componentWillMount() {
    const { name, index, defaultValue, validate } = this.props;

    invariant(
      this.context.mobxForms,
      '[mobx-forms] Field must be in a component decorated with "mobxForm"'
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

    this.pos = (!flatArray && Number.isInteger(index)) ? `${context}#${index}` : context;
    this.field = new FieldStore({
      name,
      defaultValue,
      validate,
    });

    if (flatArray && Number.isInteger(index)) {
      form.addField(this.pos, index, this.field);
    } else {
      form.addField(this.pos, name, this.field);
    }
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { form } = this.context.mobxForms;

    form.removeField(this.pos, name);
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
