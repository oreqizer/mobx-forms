import FormStore from '../FormStore';

jest.unmock('../FormStore');
jest.unmock('../FieldStore');
jest.unmock('../../utils/traverse');
jest.unmock('../../utils/mapDeep');
jest.unmock('ramda');
jest.unmock('mobx');

describe('#FormStore', () => {
  let form = null;

  beforeEach(() => {
    form = new FormStore();
    form.fields = {
      field1: { value: 'test' },
      fieldArray: [
        { value: 'array1' },
      ],
      fieldSections: [
        { field: { value: 'medium0' } },
        { field: { value: 'medium1' } },
      ],
    };
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
    form.push('fieldArray');

    expect(form.fields.fieldArray.length).toBe(2);
    expect(form.fields.fieldArray[1].value).toBe('');
  });

  it('should push a field section', () => {
    form.push('fieldSections', true);

    expect(form.fields.fieldSections.length).toBe(3);
    expect(form.fields.fieldSections[2]).toEqual({});
  });

  it('should pop a field', () => {
    form.pop('fieldSections');

    expect(form.fields.fieldSections.length).toBe(1);
    expect(form.fields.fieldSections[0].field.value).toBe('medium0');
  });

  it('should unshift a field', () => {
    form.unshift('fieldArray');

    expect(form.fields.fieldArray.length).toBe(2);
    expect(form.fields.fieldArray[0].value).toBe('');
  });

  it('should unshift a field section', () => {
    form.unshift('fieldSections', true);

    expect(form.fields.fieldSections.length).toBe(3);
    expect(form.fields.fieldSections[0]).toEqual({});
  });

  it('should shift a field', () => {
    form.shift('fieldSections');

    expect(form.fields.fieldSections.length).toBe(1);
    expect(form.fields.fieldSections[0].field.value).toBe('medium1');
  });

  afterEach(() => {
    form = null;
  });
});
