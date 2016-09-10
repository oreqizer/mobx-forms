import { observable, computed, toJS } from 'mobx';
import invariant from 'invariant';
import R from 'ramda';

import FieldStore from './FieldStore';
import traverse from '../utils/traverse';
import { mapDeep, mapFlat } from '../utils/mapForm';

export default class FormStore {
  __mobxForm = true;

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

  /**
   * @protected
   * @param name: string - name of the field
   * @param context: string - path to the field base
   */
  addField(name, context) {
    const base = traverse(this.fields, context);
    invariant(
      !base[name],
      `[mobx-forms] Tried to mount a Field '${name}' twice. Names must be unique!`
    );
    base[name] = new FieldStore();
  }

  /**
   * @protected
   * @param name: string - name of the array field
   * @param context: string - path to the field base
   */
  addFieldArray(name, context) {
    const base = traverse(this.fields, context);
    invariant(
      !base[name],
      `[mobx-forms] Tried to mount a FieldArray '${name}' twice. Names must be unique!`
    );
    base[name] = [];
  }

  /**
   * @protected
   * @param name: string - name of the field
   * @param context: string - path to the field base
   */
  removeField(name, context) {
    const base = traverse(this.fields, context);
    delete base[name];
  }

  push(context, deep) {
    const base = traverse(this.fields, context);
    if (deep) {
      base.push({});
    } else {
      base.push(new FieldStore());
    }
  }

  pop(context) {
    const base = traverse(this.fields, context);
    base.pop();
  }

  unshift(context, deep) {
    const base = traverse(this.fields, context);
    if (deep) {
      base.unshift({});
    } else {
      base.unshift(new FieldStore());
    }
  }

  shift(context) {
    const base = traverse(this.fields, context);
    base.shift();
  }
}
