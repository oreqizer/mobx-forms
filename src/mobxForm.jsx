import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import invariant from 'invariant';
import R from 'ramda';

import FormStore from './containers/FormStore';
import { MOBX_FORMS } from './consts/accessors';

/**
 * Decorator for a component that will be the root of a form.
 *
 * @param options
 * @prop options.form: string - the form's name
 * @prop options.cleanup: ?bool - shall the form be destroyed on unmount?
 */
const mobxForm = options => {
  invariant(options.form, '[mobxForms] "form" option is required on the "mobxForm" decorator.');

  return WrappedComponent => {
    WrappedComponent.contextTypes = { // eslint-disable-line no-param-reassign
      _mobxForm: PropTypes.string.isRequired,
    };

    class FormWrap extends Component {
      getChildContext() {
        return {
          _mobxForm: this.props.mobxForm[options.form],
        };
      }

      componentWillMount() {
        this.props.mobxForm.addForm(options.form);
      }

      componentWillUnmount() {
        if (options.cleanup) {
          this.props.mobxForm.removeForm(options.form);
        }
      }

      render() {
        const props = R.omit([MOBX_FORMS], this.props);

        props[options.form] = this.props.mobxForm[options.form];

        return (
          <WrappedComponent {...props} />
        );
      }
    }

    FormWrap.propTypes = {
      onSubmit: PropTypes.func.isRequired,
      mobxForm: PropTypes.instanceOf(FormStore).isRequired,
    };

    FormWrap.childContextTypes = {
      _mobxForm: PropTypes.instanceOf(FormStore).isRequired,
    };

    return inject(MOBX_FORMS)(FormWrap);
  };
};

export default mobxForm;
