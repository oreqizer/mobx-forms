import { observable } from 'mobx';

import { Value } from "../utils/getValue";


export interface IField {
  __mobxField: boolean;
}

export interface Input {
  value?: Value;
  error?: string | null;
}

export interface IFieldProps {
  value: Value;
  visited: boolean;
  touched: boolean;
  active: boolean;
  error: string | null;
  dirty: boolean;
}

export default class FieldStore implements IField {
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
