import { observable, computed } from 'mobx';

export default class FieldStore {
  @observable value = '';
  @observable touched = false;
  @observable active = false;
  defaultValue = '';
  validate = () => null;

  @computed get error() {
    return this.validate(this.value);
  }

  @computed get pristine() {
    return this.value === this.defaultValue;
  }

  @computed get dirty() {
    return !this.pristine;
  }

  get props() {
    return {
      value: this.value,
      touched: this.touched,
      active: this.active,
      error: this.error,
      pristine: this.pristine,
      dirty: this.dirty,
    };
  }
}
