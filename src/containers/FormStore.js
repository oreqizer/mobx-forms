import { observable, computed } from 'mobx';
import invariant from 'invariant';
import R from 'ramda';

import FieldStore from './FieldStore';
import traverse from '../utils/traverse';
import mapDeep from '../utils/mapDeep';

export default class FormStore {
  @observable fields = {};

  @computed get values() {
    return mapDeep(R.prop('value'), this.fields);
  }

  @computed get errors() {
    return mapDeep(R.prop('error'), this.fields);
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

  pushField(context) {
    const base = traverse(this.fields, context);
    base.push(new FieldStore());
  }

  pushSection(context) {
    const base = traverse(this.fields, context);
    base.push({});
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
}
