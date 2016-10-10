import * as React from 'react';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { ARRAY_IGNORE_PROPS } from './utils/consts';

import contextShape from './utils/contextShape';
import { IMobxForms } from './utils/types';


interface IProps {
  name: string;
  component: React.ComponentClass<any> | React.StatelessComponent<any>;
  // defaulted:
  flat: boolean;
  // optional:
  index: number | undefined;
}

interface IFields {
  map: Function;
  push: Function;
  pop: Function;
  unshift: Function;
  shift: Function;
}

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

  context: IMobxForms;

  position: string;
  location: string;
  fields: IFields;

  getChildContext() {
    const { name, index, flat } = this.props;
    const { form, context } = this.context.mobxForms;

    return {
      mobxForms: {
        form,
        context: (index && Number.isInteger(index)) ? `${context}#${index}.${name}` : name,
        flatArray: flat,
      },
    };
  }

  componentWillMount() {
    const { name, index, flat } = this.props;

    invariant(
      this.context.mobxForms,
      '[mobx-forms] FieldArray must be in a component decorated with "mobxForm"'
    );

    const { form, context, flatArray } = this.context.mobxForms;

    const validIndex = index && Number.isInteger(index);
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
      push: () => form.push(this.location, flat ? null : {}),
      pop: () => form.pop(this.location),
      unshift: () => form.unshift(this.location, flat ? null : {}),
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

    return React.createElement(component, R.merge(rest, {
      fields: this.fields,
    }));
  }
}
