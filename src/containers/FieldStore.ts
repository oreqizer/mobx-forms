import { observable } from 'mobx';

interface Input {
  value: string;
  error: string | null;
}

export default class FieldStore {
  __mobxField = true;

  @observable value: string = '';
  @observable error: string | null = null;
  @observable visited: boolean = false;
  @observable touched: boolean = false;
  @observable active: boolean = false;
  @observable dirty: boolean = false;

  constructor(input: Input) {
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
