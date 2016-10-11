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

  @mobx.computed get errors(): IDeepMap<string> {
    return mapDeep<string>(R.prop('error'), mobx.toJS(this.fields));
  }

  @mobx.computed get valid(): boolean {
    return R.all(R.equals(null), mapFlat(R.prop('error'), mobx.toJS(this.fields)));
  }

  addField(context: string, name: string | number, field: FieldStore) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base) && typeof name === 'number') {
      base[name] = field;
    } else if (mobx.isObservableObject(base)) {
      const baseObj = base as FormObject;
      invariant(
        !baseObj[name],
        `[mobx-forms] Tried to mount a Field '${name}' twice. Names must be unique!`
      );
      baseObj[name] = field;
    }
  }

  addFieldArray(context: string, name: string) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableObject(base)) {
      const baseObj = base as FormObject;
      invariant(
          !baseObj[name],
          `[mobx-forms] Tried to mount a FieldArray '${name}' twice. Names must be unique!`
      );
      baseObj[name] = mobx.observable([]);
    }
  }

  removeField(context: string, name: string | number) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base) && typeof name === 'number') {
      delete base[name];
    } else if (mobx.isObservableObject(base)) {
      const baseObj = base as FormObject;
      delete baseObj[name];
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

  push(context: string, field: null | {}) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.push(field);
    }
  }

  pop(context: string) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.pop();
    }
  }

  unshift(context: string, field: null | {}) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.unshift(field);
    }
  }

  shift(context: string) {
    const base = traverse(this.fields, context);
    if (mobx.isObservableArray(base)) {
      base.shift();
    }
  }
}
