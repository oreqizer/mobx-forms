import Form from './containers/FormStore';

export default class FormsStore {
  forms = {};

  /**
   * @protected
   * @param name: string - name of the form
   */
  addForm(name) {
    if (!this.forms[name]) {
      this.forms[name] = new Form();
    }
  }

  /**
   * @protected
   * @param name: string - name of the form
   */
  removeForm(name) {
    delete this.forms[name];
  }
}
