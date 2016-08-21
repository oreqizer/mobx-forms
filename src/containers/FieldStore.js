import { observable, computed } from 'mobx';

export default class FieldStore {
  @observable value = '';
  @observable error = null;
  @observable touched = false;
  @observable active = false;
  defaultValue = '';

  @computed get pristine() {
    return this.value === this.defaultValue;
  }
}
