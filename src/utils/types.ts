import FormStore from '../containers/FormStore';

export interface IMobxForms { // TODO move to .ts.d
  mobxForms: {
    form: FormStore;
    context: string;
    flatArray: boolean;
  };
}

export interface IFieldProps {
  value: string | boolean;
  visited: boolean;
  touched: boolean;
  active: boolean;
  error: string | null;
  dirty: boolean;
}

export type SynthEvent = React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>;
