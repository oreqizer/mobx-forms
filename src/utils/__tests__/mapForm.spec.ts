import { observable } from 'mobx';
import * as R from 'ramda';

import { mapDeep, mapFlat } from '../mapForm';

import FieldStore from '../../containers/FieldStore';


const flat = {
  field1: new FieldStore({ value: 'flat0' }),
  field2: new FieldStore({ value: 'flat1' }),
};

const medium = {
  field1: new FieldStore({ value: 'flat0' }),
  fieldArray: observable([
    { field: new FieldStore({ value: 'medium0' }) },
    { field: new FieldStore({ value: 'medium1' }) },
  ]),
  flatArray: observable([
    new FieldStore({ value: 'array0' }),
    new FieldStore({ value: 'array1' }),
  ]),
};

const deep = {
  field1: new FieldStore({ value: 'flat0' }),
  fieldArray: observable([
    {
      field: new FieldStore({ value: 'medium0' }),
      nested: observable([]),
    },
    {
      field: new FieldStore({ value: 'medium1' }),
      nested: observable([
        new FieldStore({ value: 'deep0' }),
      ]),
    },
  ]),
};

describe('#mapDeep', () => {
  it('should map a flat form', () => {
    const result: any = mapDeep<string>(R.prop('value'), flat);

    expect(result.field1).toBe('flat0');
    expect(result.field2).toBe('flat1');
  });

  it('should map a medium form', () => {
    const result: any = mapDeep<string>(R.prop('value'), medium);

    expect(result.field1).toBe('flat0');
    expect(result.fieldArray[0].field).toBe('medium0');
    expect(result.fieldArray[1].field).toBe('medium1');
    expect(result.flatArray[0]).toBe('array0');
    expect(result.flatArray[1]).toBe('array1');
  });

  it('should map a deep form', () => {
    const result: any = mapDeep<string>(R.prop('value'), deep);

    expect(result.field1).toBe('flat0');
    expect(result.fieldArray[0].field).toBe('medium0');
    expect(result.fieldArray[1].field).toBe('medium1');
    expect(result.fieldArray[1].nested[0]).toBe('deep0');
  });
});

describe('#mapFlat', () => {
  it('should map a flat form', () => {
    const result: any = mapFlat<string>(R.prop('value'), flat);

    expect(result).toEqual(['flat0', 'flat1']);
  });

  it('should map a medium form', () => {
    const result: any = mapFlat<string>(R.prop('value'), medium);

    expect(result).toEqual(['flat0', 'medium0', 'medium1', 'array0', 'array1']);
  });

  it('should map a deep form', () => {
    const result: any = mapFlat<string>(R.prop('value'), deep);

    expect(result).toEqual(['flat0', 'medium0', 'medium1', 'deep0']);
  });
});
