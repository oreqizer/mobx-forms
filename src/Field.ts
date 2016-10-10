import * as React from 'react';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as invariant from 'invariant';

import FieldStore from './containers/FieldStore';

import prepareProps from './utils/prepareProps';
import getValue from './utils/getValue';

import contextShape from './utils/contextShape';
import { IMobxForms, SynthEvent, Value } from './utils/types';


interface IProps {
  name: string;
  component: React.ComponentClass<any> | string;
  index?: number;
  validate: (value: Value) => string | null;
  defaultValue: string;
}

@observer
export default class Field extends React.Component<IProps, void> {
  static defaultProps = {
    validate: () => null,
    defaultValue: '',
  };

  static contextTypes = {
    mobxForms: React.PropTypes.shape(contextShape).isRequired,
  };

  context: IMobxForms;

  position: string;
  key: string | number;
  field: FieldStore;

  constructor(props: IProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    const { name, index, defaultValue, validate } = this.props;

    invariant(
      this.context.mobxForms,
      '[mobx-forms] Field must be in a component decorated with "mobxForm"'
    );

    const { form, context, flatArray } = this.context.mobxForms;

    const validIndex = Boolean(index && Number.isInteger(index));
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

    this.position = (!flatArray && validIndex) ? `${context}#${index}` : context;
    this.key = (flatArray && index && validIndex) ? index : name;
    this.field = new FieldStore({
      value: defaultValue,
      error: validate(defaultValue),
    });

    form.addField(this.position, this.key, this.field);
  }

  componentWillUnmount() {
    const { form } = this.context.mobxForms;

    form.removeField(this.position, this.key);
  }

  handleChange(ev: SynthEvent) {
    const { validate, defaultValue } = this.props;

    const value = getValue(ev);
    this.field.value = value;
    this.field.error = validate(value);
    this.field.dirty = value !== defaultValue;
  }

  handleFocus() {
    this.field.active = true;
    this.field.visited = true;
  }

  handleBlur() {
    this.field.active = false;
    this.field.touched = true;
  }

  render(): JSX.Element {
    const { component } = this.props;

    const props = R.merge({
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    }, R.omit(['component'], this.props));

    const { input, meta, custom } = prepareProps(R.merge(props, this.field.props));

    if (typeof component === 'string') {
      return React.createElement(component, R.merge(custom, input));
    }

    return React.createElement(component, R.merge(custom, { input, meta }));
  }
}
