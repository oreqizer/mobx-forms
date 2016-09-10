import R from 'ramda';

import mapDeep from '../mapDeep';

import FieldStore from '../../containers/FieldStore'; // TODO mock this + add values

jest.unmock('../mapDeep');
jest.unmock('../../containers/FieldStore');
jest.unmock('ramda');

const flat = {
  field1: new FieldStore(),
  field2: new FieldStore(),
};

const medium = {
  field1: new FieldStore(),
  fieldArray: [
    { field: new FieldStore() },
    { field: new FieldStore() },
  ],
  flatArray: [
    new FieldStore(),
    new FieldStore(),
  ],
};

const deep = {
  field1: new FieldStore(),
  fieldArray: [
    { field: new FieldStore() },
    {
      field: new FieldStore(),
      nested: [
        new FieldStore(),
      ],
    },
  ],
};

describe('#mapDeep', () => {
  it('should map a flat form', () => {
    const result = mapDeep(R.prop('value'), flat);

    expect(result.field1).toBe('');
    expect(result.field2).toBe('');
  });

  it('should map a medium form', () => {
    const result = mapDeep(R.prop('value'), medium);

    expect(result.field1).toBe('');
    expect(result.fieldArray[0].field).toBe('');
    expect(result.fieldArray[1].field).toBe('');
    expect(result.flatArray[0]).toBe('');
    expect(result.flatArray[1]).toBe('');
  });

  it('should map a deep form', () => {
    const result = mapDeep(R.prop('value'), deep);

    expect(result.field1).toBe('');
    expect(result.fieldArray[0].field).toBe('');
    expect(result.fieldArray[1].field).toBe('');
    expect(result.fieldArray[1].nested[0]).toBe('');
  });
});
