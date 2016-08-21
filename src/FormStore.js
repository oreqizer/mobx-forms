import Form from './containers/Form';

export default class FormStore {
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
