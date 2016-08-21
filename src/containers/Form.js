import { observable } from 'mobx';

import Field from './Field';

export default class From {
  @observable fields: {};

  /**
   * @protected
   * @param name: string - name of the field
   */
  addField(name) {
    if (!this.fields[name]) {
      this.fields[name] = new Field();
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
