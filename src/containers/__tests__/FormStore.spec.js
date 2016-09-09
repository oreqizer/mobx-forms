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
    { value: 'array1' },
  ],
  fieldSections: [
    { field: { value: 'medium0' } },
    { field: { value: 'medium1' } },
  ],
};

describe('#FormStore', () => {
  let form = null;

  beforeEach(() => {
    form = new FormStore();
    form.fields = fields;
  });

  // TODO: add 'values' and 'errors'

  it('should add a field directly', () => {
    form.addField('field2', '');

    expect(form.fields.field2).toBeDefined();
  });

  it('should add a field deeply', () => {
    form.addField('field1', 'fieldSections#1');

    expect(form.fields.fieldSections[1].field1).toBeDefined();
  });

  it('should push a field', () => {
    form.pushField('fieldArray');

    expect(form.fields.fieldArray.length).toBe(2);
  });

  it('should push a section', () => {
    form.pushSection('fieldSections');

    expect(form.fields.fieldSections.length).toBe(3);
    expect(form.fields.fieldSections[2]).toEqual({});
  });

  afterEach(() => {
    form = null;
  });
});
