import { observable } from 'mobx';

export default class FieldStore {
  __mobxField = true;

  @observable value = '';
  @observable error = null;
  @observable visited = false;
  @observable touched = false;
  @observable active = false;
  @observable dirty = false;

  constructor(input) {
    Object.assign(this, input);
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
