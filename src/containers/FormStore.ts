import * as mobx from 'mobx';
import * as invariant from 'invariant';
import * as R from 'ramda';

import traverse from '../utils/traverse';
import { mapDeep, mapFlat } from '../utils/mapForm';

import FieldStore from './FieldStore';
import { FormObject, IDeepMap } from '../utils/types';


export default class FormStore {
  @mobx.observable fields: FormObject = {};

  @mobx.computed get values(): IDeepMap<string> {
    return mapDeep<string>(R.prop('value'), mobx.toJS(this.fields));
  }

  @mobx.computed get errors(): IDeepMap<string | null> {
    return mapDeep<string | null>(R.prop('error'), mobx.toJS(this.fields));
  }

  @mobx.computed get valid(): boolean {
    return R.all(
        R.equals(null), mapFlat<string | null>(R.prop('error'), mobx.toJS(this.fields))
    );
  }

  addField(context: string, name: string, field: FieldStore) {
    const base = traverse(this.fields, context);
    const baseObj = <FormObject> base;
    invariant(
        !baseObj[name],
        `[mobx-forms] Tried to mount a Field '${name}' twice. Names must be unique!`
    );
    baseObj[name] = field;
  }

  addFieldIndex(context: string, name: number, field: FieldStore) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base[name] = field;
    }
  }

  addFieldArray(context: string, name: string) {
    const base = traverse(this.fields, context);
    const baseObj = <FormObject> base;
    invariant(
        !baseObj[name],
        `[mobx-forms] Tried to mount a FieldArray '${name}' twice. Names must be unique!`
    );
    baseObj[name] = mobx.observable([]);
  }

  removeField(context: string, name: string) {
    const base = traverse(this.fields, context);
    delete (<FormObject> base)[name];
  }

  removeFieldIndex(context: string, index: number) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.splice(index, 1);
    }
  }

  // Array functions
  // ---

  map<T>(context: string, fn: (x: number) => T): Array<T> {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      return R.map(fn, R.addIndex(R.map)((_, i) => i, base));
    }
    return [];
  }

  push(context: string) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.push({});
    }
  }

  pop(context: string) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.pop();
    }
  }

  unshift(context: string) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.unshift({});
    }
  }

  shift(context: string) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.shift();
    }
  }
}
