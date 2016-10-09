import FormStore from '../FormStore';
import FieldStore from '../FieldStore';

jest.mock('../FieldStore');

describe('#FormStore', () => {
  let form = null;

  beforeEach(() => {
    form = new FormStore();
    form.fields = {
      field1: new FieldStore({ value: 'test', error: null }),
      fieldArray: [
        new FieldStore({ value: 'array1', error: 'short' }),
      ],
      fieldSections: [
        { field: new FieldStore({ value: 'medium0', error: 'long' }) },
        { field: new FieldStore({ value: 'medium1', error: null }) },
      ],
    };
  });

  it('should return all values', () => {
    expect(form.values).toEqual({
      field1: 'test',
      fieldArray: [
        'array1',
      ],
      fieldSections: [
        { field: 'medium0' },
        { field: 'medium1' },
      ],
    });
  });

  it('should return all errors', () => {
    expect(form.errors).toEqual({
      field1: null,
      fieldArray: [
        'short',
      ],
      fieldSections: [
        { field: 'long' },
        { field: null },
      ],
    });
  });

  it('should mark a from as invalid', () => {
    expect(form.valid).toBe(false);
  });

  it('should add a field directly', () => {
    form.addField('', 'field2', new FieldStore());

    expect(form.fields.field2).toBeDefined();
  });

  it('should add a field deeply', () => {
    form.addField('fieldSections#1', 'field1', new FieldStore());

    expect(form.fields.fieldSections[1].field1).toBeDefined();
  });

  it('should add a field array directly', () => {
    form.addFieldArray('', 'field2');

    expect(form.fields.field2).toBeDefined();
  });

  it('should add a field array deeply', () => {
    form.addFieldArray('fieldSections#1', 'field1');

    expect(form.fields.fieldSections[1].field1).toBeDefined();
  });

  it('should remove a field directly', () => {
    form.removeField('', 'field1');

    expect(form.fields.field1).toBeUndefined();
  });

  it('should remove a field deeply', () => {
    form.removeField('fieldSections#1', 'field');

    expect(form.fields.fieldSections[1].field).toBeUndefined();
  });

  it('should map a field array', () => {
    const result = form.map('fieldArray', id => id);

    expect(result).toEqual([0]);
  });

  it('should push an empty field', () => {
    form.push('fieldArray', null);

    expect(form.fields.fieldArray.length).toBe(2);
  });

  it('should push an object field', () => {
    form.push('fieldSections', {});

    expect(form.fields.fieldSections.length).toBe(3);
    expect(form.fields.fieldSections[2]).toEqual({});
  });

  it('should pop a field', () => {
    form.pop('fieldSections');

    expect(form.fields.fieldSections.length).toBe(1);
    expect(form.fields.fieldSections[0].field.value).toBe('medium0');
  });

  it('should unshift an empty field', () => {
    form.unshift('fieldArray', null);

    expect(form.fields.fieldArray.length).toBe(2);
  });

  it('should unshift an object field', () => {
    form.unshift('fieldSections', {});

    expect(form.fields.fieldSections.length).toBe(3);
    expect(form.fields.fieldSections[0]).toEqual({});
  });

  it('should shift a field', () => {
    form.shift('fieldSections');

    expect(form.fields.fieldSections.length).toBe(1);
    expect(form.fields.fieldSections[0].field.value).toBe('medium1');
  });
});