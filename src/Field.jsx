import React, { Component, PropTypes } from 'react';

import FormStore from './containers/FormStore';

class Field extends Component {
  componentWillMount() {
    const { name, key } = this.props;
    this.context._mobxForm.addField(name + key); // eslint-disable-line no-underscore-dangle
  }

  componentWillUnmount() {
    const { name, key } = this.props;
    this.context._mobxForm.removeField(name + key); // eslint-disable-line no-underscore-dangle
  }

  render() {
    const { component } = this.props;

    if (!component) {
      // render a bare input
      return (
        <input type="text" />
      );
    }

    return (
      <component />
    );
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  key: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func,
  ]),
};

Field.defaultProps = {
  key: '',
};

Field.contextTypes = {
  _mobxForm: PropTypes.instanceOf(FormStore).isRequired,
};

export default Field;
