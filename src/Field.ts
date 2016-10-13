import * as React from 'react';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { IMobxForms } from "./mobxForm";
import FormStore from "./containers/FormStore";
import FieldStore from './containers/FieldStore';

import prepareProps from './utils/prepareProps';
import getValue, { Value, SynthEvent } from './utils/getValue';


export type Validate = (value: Value) => string | null;

export interface IProps {
  name: string;
  component: React.ComponentClass<any> | React.StatelessComponent<any> | string;
  index?: number;
  validate?: Validate;
  defaultValue?: string;
}

@observer
export default class Field extends React.Component<IProps, void> {
  static defaultProps = {
    validate: () => null,
    defaultValue: '',
  };

  static contextTypes = {
    mobxForms: React.PropTypes.shape({
      form: React.PropTypes.instanceOf(FormStore).isRequired,
      context: React.PropTypes.string.isRequired,
      flatArray: React.PropTypes.bool.isRequired,
    }).isRequired,
  };

  context: IMobxForms;

  position: string;
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

    if (context === '') {
      invariant(
        typeof index !== 'number',
        '[mobx-forms] "index" can only be passed to components inside ArrayField'
      );
    } else {
      invariant(
        typeof index === 'number',
        '[mobx-forms] "index" must be passed to ArrayField components'
      );
    }

    this.position = (!flatArray && (typeof index === 'number')) ? `${context}#${index}` : context;
    this.field = new FieldStore({
      value: <string> defaultValue,
      error: (<Validate> validate)(<string> defaultValue),
    });

    if (flatArray && typeof index === 'number') {
      form.addFieldIndex(this.position, index, this.field);
    } else {
      form.addField(this.position, name, this.field);
    }
  }

  componentWillUnmount() {
    const { index, name } = this.props;
    const { form, flatArray } = this.context.mobxForms;

    if (flatArray && typeof index === 'number') {
      form.removeFieldIndex(this.position, index);
    } else {
      form.removeField(this.position, name);
    }
  }

  handleChange(ev: SynthEvent) {
    const { validate, defaultValue } = this.props;

    const value = getValue(ev);
    this.field.value = value;
    this.field.error = (<Validate> validate)(value);
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
