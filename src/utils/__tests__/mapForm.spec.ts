import * as R from 'ramda';

import { mapDeep, mapFlat } from '../mapForm';


const flat = {
  field1: { value: 'flat0', __mobxField: true },
  field2: { value: 'flat1', __mobxField: true },
};

const medium = {
  field1: { value: 'flat0', __mobxField: true },
  fieldArray: [
    { field: { value: 'medium0', __mobxField: true } },
    { field: { value: 'medium1', __mobxField: true } },
  ],
  flatArray: [
    { value: 'array0', __mobxField: true },
    { value: 'array1', __mobxField: true },
  ],
};

const deep = {
  field1: { value: 'flat0', __mobxField: true },
  fieldArray: [
    {
      field: { value: 'medium0', __mobxField: true },
      nested: [],
    },
    {
      field: { value: 'medium1', __mobxField: true },
      nested: [
        { value: 'deep0', __mobxField: true },
      ],
    },
  ],
};

const mapFn = R.prop('value');

describe('#mapDeep', () => {
  it('should map a flat form', () => {
    const result: any = mapDeep<string>(mapFn, flat);

    expect(result.field1).toBe('flat0');
    expect(result.field2).toBe('flat1');
  });

  it('should map a medium form', () => {
    const result: any = mapDeep<string>(mapFn, medium);

    expect(result.field1).toBe('flat0');
    expect(result.fieldArray[0].field).toBe('medium0');
    expect(result.fieldArray[1].field).toBe('medium1');
    expect(result.flatArray[0]).toBe('array0');
    expect(result.flatArray[1]).toBe('array1');
  });

  it('should map a deep form', () => {
    const result: any = mapDeep<string>(mapFn, deep);

    expect(result.field1).toBe('flat0');
    expect(result.fieldArray[0].field).toBe('medium0');
    expect(result.fieldArray[1].field).toBe('medium1');
    expect(result.fieldArray[1].nested[0]).toBe('deep0');
  });
});

describe('#mapFlat', () => {
  it('should map a flat form', () => {
    const result: Array<string> = mapFlat<string>(mapFn, flat);

    expect(result).toEqual(['flat0', 'flat1']);
  });

  it('should map a medium form', () => {
    const result: Array<string> = mapFlat<string>(mapFn, medium);

    expect(result).toEqual(['flat0', 'medium0', 'medium1', 'array0', 'array1']);
  });

  it('should map a deep form', () => {
    const result: Array<string> = mapFlat<string>(mapFn, deep);

    expect(result).toEqual(['flat0', 'medium0', 'medium1', 'deep0']);
  });
});
