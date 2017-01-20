import * as React from 'react';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { IContext } from "./mobxForm";
import FormStore from "./containers/FormStore";

import { ARRAY_IGNORE_PROPS } from './utils/consts';


export interface IProps {
  name: string;
  component: React.ComponentClass<any> | React.StatelessComponent<any>;
  // defaulted:
  flat?: boolean;
  // optional:
  index?: number | undefined;
}

export interface IFields {
  map: Function;
  push: Function;
  pop: Function;
  unshift: Function;
  shift: Function;
}

const contextShape = {
  form: React.PropTypes.instanceOf(FormStore).isRequired,
  context: React.PropTypes.string.isRequired,
  flatArray: React.PropTypes.bool.isRequired,
};

@observer
export default class FieldArray extends React.Component<IProps, void> {
  static defaultProps = {
    flat: false,
  };

  static contextTypes = {
    mobxForms: React.PropTypes.shape(contextShape).isRequired,
  };

  static childContextTypes = {
    mobxForms: React.PropTypes.shape(contextShape).isRequired,
  };

  context: IContext;

  position: string;
  location: string;
  fields: IFields;

  getChildContext() {
    const { name, index, flat } = this.props;
    const { form, context } = this.context.mobxForms;

    return {
      mobxForms: {
        form,
        context: typeof index === 'number' ? `${context}#${index}.${name}` : name,
        flatArray: flat,
      },
    };
  }

  componentWillMount() {
    const { name, index } = this.props;

    invariant(
      this.context.mobxForms,
      '[mobx-forms] FieldArray must be in a component decorated with "mobxForm"'
    );

    const { form, context, flatArray } = this.context.mobxForms;

    const validIndex = typeof index === 'number';
    if (context === '') {
      invariant(
        !validIndex,
        '[mobx-forms] "index" can only be passed to components inside ArrayField'
      );
    } else {
      invariant(
        validIndex,
        '[mobx-forms] "index" must be passed to ArrayField components'
      );
    }

    this.position = validIndex ? `${context}#${index}` : '';
    this.location = validIndex ? `${context}#${index}.${name}` : name;
    this.fields = {
      map: (fn: (index: number) => any) => form.map(this.location, fn),
      push: () => form.push(this.location),
      pop: () => form.pop(this.location),
      unshift: () => form.unshift(this.location),
      shift: () => form.shift(this.location),
    };

    invariant(
      !flatArray,
      '[mobx-forms] FieldArray cannot be located within a flat FieldArray'
    );

    form.addFieldArray(this.position, name);
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { form } = this.context.mobxForms;

    form.removeField(this.position, name);
  }

  render() {
    const { component } = this.props;

    const rest = R.omit(ARRAY_IGNORE_PROPS, this.props);

    return React.createElement(component as React.ComponentClass<any>, R.merge(rest, {
      fields: this.fields,
    }));
  }
}
