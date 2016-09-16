import { observable } from 'mobx';
import invariant from 'invariant';

import FormStore from './containers/FormStore';


export default class FormsStore {
  @observable forms = {};

  /**
   * @protected
   * @param name: string - name of the form
   */
  addForm(name) {
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
  removeForm(name) {
    delete this.forms[name];
  }
}
