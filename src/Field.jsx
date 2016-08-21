import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import FieldComponent from './components/FieldComponent';
import FormStore from './containers/FormStore';

export default class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    key: PropTypes.string,
    defaultValue: PropTypes.string,
  };

  static defaultProps = {
    key: '',
  };

  static contextTypes = {
    _mobxForm: PropTypes.instanceOf(FormStore).isRequired,
  };

  componentWillMount() {
    const { name, key, defaultValue } = this.props;
    this.form = this.context._mobxForm; // eslint-disable-line no-underscore-dangle
    this.form.addField(name + key);
    this.field = this.form.fields[name + key];

    if (defaultValue) {
      this.field.defaultValue = defaultValue;
    }
  }

  componentWillUnmount() {
    const { name, key } = this.props;
    this.form.removeField(name + key);
  }

  render() {
    const { props, field } = this;

    return (
      <FieldComponent
        {...props}
        value={field.value}
        valid={!field.error}
        error={field.error}
        pristine={field.pristine}
        dirty={!field.pristine}
        active={field.active}
        touched={field.touched}
      />
    );
  }
}
