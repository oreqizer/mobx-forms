import { observable, computed } from 'mobx';

export default class FieldStore {
  @observable value = '';
  @observable defaultValue = '';
  @observable error = null;
  @observable touched = false;
  @observable active = false;

  @computed get pristine() {
    return this.value === this.defaultValue;
  }

  @computed get dirty() {
    return !this.pristine;
  }
}
