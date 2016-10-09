import { observable } from 'mobx';
import * as invariant from 'invariant';

import FormStore from './containers/FormStore';


interface Forms {
  [key: string]: FormStore;
}

export default class FormsStore {
  @observable forms: Forms = {};

  /**
   * @protected
   * @param name: string - name of the form
   */
  addForm(name: string) {
    invariant(
      !this.forms[name],
      `[mobx-forms] Tried to add a Form '${name}' twice. Form names must be unique!`
    );
    this.forms[name] = new FormStore();
  }

  /**
   * @protected
   * @param name: string - name of the form
   */
  removeForm(name: string) {
    delete this.forms[name];
  }
}
