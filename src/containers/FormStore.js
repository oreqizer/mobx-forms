import { observable } from 'mobx';

import FieldStore from './FieldStore';

export default class FormStore {
  @observable fields: {};

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
