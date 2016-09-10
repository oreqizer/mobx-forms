export default class FieldStore {
  value = '';
  error = null;

  constructor(input) {
    Object.assign(this, input);
  }
}
