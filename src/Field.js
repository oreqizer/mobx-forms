import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import R from 'ramda';

import FormStore from './containers/FormStore';
import { separateProps, valueFromEv } from './utils/helpers';

@observer
export default class Field extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    // ---
    validate: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  static contextTypes = {
    _mobxForm: PropTypes.instanceOf(FormStore).isRequired,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    const { id, defaultValue, validate } = this.props;
    this.form = this.context._mobxForm; // eslint-disable-line no-underscore-dangle
    this.form.addField(id);
    this.field = this.form.fields[id];

    if (defaultValue) {
      this.field.value = defaultValue;
      this.field.defaultValue = defaultValue;
    }

    if (validate) {
      this.field.validate = validate;
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    this.form.removeField(id);
  }

  handleChange(ev) {
    this.field.value = valueFromEv(ev);
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

    props.onChange = this.handleChange;
    props.onFocus = this.handleFocus;
    props.onBlur = this.handleBlur;

    const { input, meta, custom } = separateProps(R.merge(props, this.field.props));

    if (typeof component === 'string') {
      return React.createElement(component, R.merge(custom, input));
    }

    return React.createElement(component, {
      ...custom,
      input,
      meta,
    });
  }
}
