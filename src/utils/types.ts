import FormStore from '../containers/FormStore';

export interface IMobxForms { // TODO move to .ts.d
  mobxForms: {
    form: FormStore;
    context: string;
    flatArray: boolean;
  };
}
