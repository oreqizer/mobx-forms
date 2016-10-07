export default class FieldStore {
  __mobxField = true;

  name = 'test';
  value = '';
  error = null;

  constructor(input) {
    Object.assign(this, input);
  }
}
