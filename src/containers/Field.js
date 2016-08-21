import { observable, computed } from 'mobx';

export default class Field {
  @observable value = '';
  @observable touched = false;
  validator = '';
  defaultValue = '';

  change(value = '') {
    this.value = value;
  }

  @computed get error() {
    return this.validator ? this.validator(this.value) : null;
  }

  @computed get pristine() {
    return this.value === this.defaultValue;
  }
}
