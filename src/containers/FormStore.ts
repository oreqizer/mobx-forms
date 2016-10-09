import { observable, computed, toJS } from 'mobx';
import * as invariant from 'invariant';
import * as R from 'ramda';

import traverse from '../utils/traverse';
import { mapDeep, mapFlat } from '../utils/mapForm';

import FieldStore from './FieldStore';


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

  addField(context: string, name: string | number, field: FieldStore) {
    const base = traverse(this.fields, context);
    invariant(
      !base[name],
      `[mobx-forms] Tried to mount a Field '${name}' twice. Names must be unique!`
    );
    base[name] = field;
  }

  addFieldArray(context: string, name: string) {
    const base = traverse(this.fields, context);
    invariant(
      !base[name],
      `[mobx-forms] Tried to mount a FieldArray '${name}' twice. Names must be unique!`
    );
    base[name] = observable([]);
  }

  removeField(context: string, name: string | number) {
    const base = traverse(this.fields, context);
    delete base[name];
  }

  // Array functions
  // ---

  map<T>(context: string, fn: (x: number) => T): Array<T> {
    const base = traverse(this.fields, context);
    return R.map(fn, R.addIndex(R.map)((_, i) => i, base));
  }

  push(context: string, field: null | {}) {
    const base = traverse(this.fields, context);
    base.push(field);
  }

  pop(context: string) {
    const base = traverse(this.fields, context);
    base.pop();
  }

  unshift(context: string, field: null | {}) {
    const base = traverse(this.fields, context);
    base.unshift(field);
  }

  shift(context: string) {
    const base = traverse(this.fields, context);
    base.shift();
  }
}
