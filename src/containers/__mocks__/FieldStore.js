export default class FieldStore {
  __mobxField = true;

  value = '';
  error = null;

  constructor(input) {
    Object.assign(this, input);
  }
}
