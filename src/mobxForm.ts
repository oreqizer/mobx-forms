import * as React from 'react';
import { inject } from 'mobx-react';
import * as invariant from 'invariant';
import * as R from 'ramda';

import FormStore from './containers/FormStore';
import FormsStore from './FormsStore';


export interface IOptions {
  form: string;
}

export interface IWrappedProps {
  mobxForms: FormsStore;
}

export interface IContext {
  mobxForms: {
    form: FormStore;
    context: string;
    flatArray: boolean;
  };
}

export type WrappedComponent = React.ComponentClass<any> | React.StatelessComponent<any>;

const getName = (Wrapped: WrappedComponent): string =>
  Wrapped.displayName || Wrapped.name || 'Component';

const mobxForm = (options: IOptions) => {
  invariant(
      options.form && typeof options.form === 'string',
      '[mobx-forms] "form" is a required string on the "mobxForm" decorator.'
  );

  return (Wrapped: WrappedComponent): React.ComponentClass<any> => {
    class MobxForm extends React.Component<IWrappedProps, void> {
      static displayName: string;

      static childContextTypes = {
        mobxForms: React.PropTypes.shape({
          form: React.PropTypes.instanceOf(FormStore).isRequired,
          context: React.PropTypes.string.isRequired,
          flatArray: React.PropTypes.bool.isRequired,
        }).isRequired,
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
        const props = R.omit(['mobxForms'], this.props);

        return React.createElement(Wrapped as React.ComponentClass<any>, R.merge(props, {
          form: this.props.mobxForms.forms[options.form],
        }));
      }
    }

    const Injected = inject('mobxForms')(MobxForm);

    Injected.displayName = `MobxForm(${getName(Wrapped)})`;

    return Injected;
  };
};

export default mobxForm;
