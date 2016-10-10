import FormStore from '../containers/FormStore';
import FieldStore from '../containers/FieldStore';

// TODO move all to .d.ts

export interface IMobxForms {
  mobxForms: {
    form: FormStore;
    context: string;
    flatArray: boolean;
  };
}

export interface IFieldProps {
  value: Value;
  visited: boolean;
  touched: boolean;
  active: boolean;
  error: string | null;
  dirty: boolean;
}

export type SynthEvent = React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>;

export type Value = string | string[] | number | boolean | FileList | null;

export type FormObject = { [key: string]: FieldStore | FormArray };

export type FormArray = Array<FieldStore> | Array<FormObject>;

export type FormElement = FormObject | FormArray;
