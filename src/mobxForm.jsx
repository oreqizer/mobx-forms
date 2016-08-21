import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';

/**
 * Decorator for a component that will be the root of a form.
 *
 * @param options
 * @prop options.form: string
 * @prop options.inject: ?string
 * @prop options.storeProp: ?string
 */
const mobxForm = options => {
  return WrappedComponent => {

    class Form extends Component {
      getChildContext() {
        return { _mobxForm: options.form };
      }

      render() {
        return (
          <WrappedComponent />
        );
      }
    }

    Form.propTypes = {
      // TODO
    };

    Form.childContextTypes = {
      _mobxForm: PropTypes.string.isRequired,
    };

    WrappedComponent.contextTypes = { // eslint-disable-line no-param-reassign
      _mobxForm: PropTypes.string.isRequired,
    };

    if (options.inject) {
      return inject(options.inject)(Form);
    }

    return Form;
  };
};

export default mobxForm;
