import { Component, PropTypes } from 'react';

import FormStore from './containers/FormStore';

export default class FieldArray extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

  static contextTypes = {
    _mobxForm: PropTypes.instanceOf(FormStore).isRequired,
    _mobxFormContext: PropTypes.string.isRequired,
  };

  static childContextTypes = {
    _mobxFormContext: PropTypes.string.isRequired,
  };

  getChildContext() {
    const { name } = this.props;
    const context = this.context._mobxFormContext; // eslint-disable-line no-underscore-dangle

    return {
      _mobxFormContext: `${context}.${name}`,
    };
  }

  componentWillMount() {
    const { name } = this.props;
    this.form = this.context._mobxForm; // eslint-disable-line no-underscore-dangle
    this.context = this.context._mobxFormContext; // eslint-disable-line no-underscore-dangle

    this.form.addFieldArray(name, this.context);
  }

  componentWillUnmount() {
    const { name } = this.props;
    this.form.removeFieldArray(name, this.context);
  }

  render() {
    return this.props.children;
  }
}
