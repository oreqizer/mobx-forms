import { observable, computed } from 'mobx';

export default class FieldStore {
  __mobxField = true;

  @observable value = '';
  @observable visited = false;
  @observable touched = false;
  @observable active = false;

  constructor(name) {
    this.name = name;
    this.defaultValue = '';
    this.validate = () => null;
  }

  @computed get error() {
    return this.validate(this.value);
  }

  @computed get dirty() {
    return this.value !== this.defaultValue;
  }

  get props() {
    return {
      value: this.value,
      visited: this.visited,
      touched: this.touched,
      active: this.active,
      error: this.error,
      dirty: this.dirty,
    };
  }
}
