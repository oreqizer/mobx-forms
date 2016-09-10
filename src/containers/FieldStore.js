import { observable, computed } from 'mobx';

export default class FieldStore {
  __mobxField = true;

  @observable value = '';
  @observable touched = false;
  @observable active = false;

  // Only for initialization
  // ---
  defaultValue = '';
  validate = () => null;

  @computed get error() {
    return this.validate(this.value);
  }

  @computed get valid() {
    return !this.error;
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
      valid: this.valid,
      pristine: this.pristine,
      dirty: this.dirty,
    };
  }
}
