import * as React from 'react';
import { inject } from 'mobx-react';
import * as invariant from 'invariant';
import * as R from 'ramda';

import FormsStore from './FormsStore';
import FormStore from './containers/FormStore';
import { MOBX_FORMS } from './utils/consts';

import contextShape from './utils/contextShape';


interface Options {
  form: string,
}

interface WrappedProps {
  mobxForms: FormsStore
}

interface DecoratedProps {
  form: FormStore,
}

const mobxForm = (options: Options) => {
  invariant(options.form, '[mobx-forms] "form" option is required on the "mobxForm" decorator.');

  return (WrappedComponent: React.ComponentClass<DecoratedProps>) => {
    class FormWrap extends React.Component<WrappedProps, void> {
      static childContextTypes = {
        mobxForms: React.PropTypes.shape(contextShape).isRequired,
      };

      getChildContext() {
        return {
          mobxForms: {
            form: this.props.mobxForms.forms[options.form],
            context: '',
            flatArray: false,
          },
        };
      }

      componentWillMount() {
        this.props.mobxForms.addForm(options.form);
      }

      componentWillUnmount() {
        this.props.mobxForms.removeForm(options.form);
      }

      render() {
        const props = R.omit([MOBX_FORMS], this.props);

        return React.createElement(WrappedComponent, R.merge(props, {
          form: this.props.mobxForms.forms[options.form],
        }));
      }
    }

    return inject(MOBX_FORMS)(FormWrap);
  };
};

export default mobxForm;
