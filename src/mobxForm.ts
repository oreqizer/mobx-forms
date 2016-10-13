import * as React from 'react';
import { inject } from 'mobx-react';
import * as invariant from 'invariant';
import * as R from 'ramda';

import FormStore from './containers/FormStore';
import FormsStore from './FormsStore';
import { MOBX_FORMS } from './utils/consts';

import contextShape from './utils/contextShape';


export interface IMobxForms {
  mobxForms: {
    form: FormStore;
    context: string;
    flatArray: boolean;
  };
}

interface IOptions {
  form: string;
}

interface IWrappedProps {
  mobxForms: FormsStore;
}

interface IDecoratedProps {
  form: FormStore;
}

const mobxForm = (options: IOptions) => {
  invariant(options.form, '[mobx-forms] "form" option is required on the "mobxForm" decorator.');

  return (WrappedComponent: React.ComponentClass<IDecoratedProps>) => {
    class FormWrap extends React.Component<IWrappedProps, void> {
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
