import { observable } from 'mobx';

import { IFieldProps, Value } from '../utils/types';


interface Input {
  value?: Value;
  error?: string | null;
}

export default class FieldStore {
  __mobxField = true;  // tslint:disable-line variable-name

  @observable value: Value = '';
  @observable error: string | null = null;
  @observable visited: boolean = false;
  @observable touched: boolean = false;
  @observable active: boolean = false;
  @observable dirty: boolean = false;

  constructor(input: Input = {}) {
    Object.assign(this, input);
  }

  get props(): IFieldProps {
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
