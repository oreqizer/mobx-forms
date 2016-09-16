import { observable, computed, toJS } from 'mobx';
import invariant from 'invariant';
import R from 'ramda';

import traverse from '../utils/traverse';
import { mapDeep, mapFlat } from '../utils/mapForm';


export default class FormStore {
  @observable fields = {};

  @computed get values() {
    return mapDeep(R.prop('value'), toJS(this.fields));
  }

  @computed get errors() {
    return mapDeep(R.prop('error'), toJS(this.fields));
  }

  @computed get valid() {
    return R.all(R.equals(null), mapFlat(R.prop('error'), toJS(this.fields)));
  }

  addField(context, name, field) {
    const base = traverse(this.fields, context);
    invariant(
      !base[name],
      `[mobx-forms] Tried to mount a Field '${name}' twice. Names must be unique!`
    );
    base[name] = field;
  }

  addFieldArray(context, name) {
    const base = traverse(this.fields, context);
    invariant(
      !base[name],
      `[mobx-forms] Tried to mount a FieldArray '${name}' twice. Names must be unique!`
    );
    base[name] = [];
  }

  removeField(context, name) {
    const base = traverse(this.fields, context);
    delete base[name];
  }

  // Array functions
  // ---

  map(context, fn) {
    const base = traverse(this.fields, context);
    return R.map(fn, R.map(R.prop('name'), base));
  }

  push(context, field) {
    const base = traverse(this.fields, context);
    base.push(field);
  }

  pop(context) {
    const base = traverse(this.fields, context);
    base.pop();
  }

  unshift(context, field) {
    const base = traverse(this.fields, context);
    base.unshift(field);
  }

  shift(context) {
    const base = traverse(this.fields, context);
    base.shift();
  }
}
