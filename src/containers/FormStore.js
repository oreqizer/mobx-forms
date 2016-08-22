import { observable, computed } from 'mobx';
import R from 'ramda';

import FieldStore from './FieldStore';

export default class FormStore {
  @observable fields = {};

  @computed get values() {
    return R.map(R.prop('value'), this.fields);
  }

  @computed get errors() {
    return R.map(R.prop('error'), this.fields);
  }

  /**
   * @protected
   * @param name: string - name of the field
   */
  addField(name) {
    if (!this.fields[name]) {
      this.fields[name] = new FieldStore();
    }
  }

  /**
   * @protected
   * @param name: string - name of the field
   */
  removeField(name) {
    delete this.fields[name];
  }
}
