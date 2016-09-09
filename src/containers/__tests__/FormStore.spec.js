import FormStore from '../FormStore';

jest.unmock('../FormStore');
jest.unmock('../FieldStore');
jest.unmock('../../utils/traverse');
jest.unmock('../../utils/mapDeep');
jest.unmock('ramda');
jest.unmock('mobx');

const fields = {
  field1: { value: 'test' },
  fieldArray: [
    { field: { value: 'medium0' } },
    { field: { value: 'medium1' } },
  ],
};

describe('#FormStore', () => {
  let form = null;

  beforeEach(() => {
    form = new FormStore();
  });
  //
  // it('should add a field', () => {
  //   form.addField('field', '');
  //
  //   expect(form.fields.field).toBeDefined();
  // });
  //
  // it('should add an array field', () => {
  //   form.addFieldArray('fieldArray', '');
  //
  //   expect(form.fields.fieldArray).toEqual([]);
  // });
  //
  // it('should add a field into an array field', () => {
  //   form.addFieldArray('fieldArray', '');
  //   form.addField('field', 'fieldArray[0]');
  //
  //   expect(form.fields.fieldArray[0]).toEqual([]);
  // });

  afterEach(() => {
    form = null;
  });
});
