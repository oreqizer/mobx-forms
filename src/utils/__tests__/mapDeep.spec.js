import R from 'ramda';

import mapDeep from '../mapDeep';

import FieldStore from '../../containers/FieldStore'; // TODO mock this + add values

jest.unmock('../mapDeep');
jest.unmock('../../containers/FieldStore');
jest.unmock('ramda');

const flat = {
  field1: { value: 'test' },
  field2: { value: '1337' },
};

const medium = {
  field1: { value: 'test' },
  fieldArray: [
    { field: { value: 'medium0' } },
    { field: { value: 'medium1' } },
  ],
  flatArray: [
    new FieldStore(),
    new FieldStore(),
  ],
};

const deep = {
  field1: { value: 'test' },
  fieldArray: [
    { field: { value: 'medium0' } },
    {
      field: { value: 'medium1' },
      nested: [
        new FieldStore(),
      ],
    },
  ],
};

describe('#mapDeep', () => {
  it('should map a flat form', () => {
    const result = mapDeep(R.prop('value'), flat);

    expect(result.field1).toBe('test');
    expect(result.field2).toBe('1337');
  });

  it('should map a medium form', () => {
    const result = mapDeep(R.prop('value'), medium);

    expect(result.field1).toBe('test');
    expect(result.fieldArray[0].field).toBe('medium0');
    expect(result.fieldArray[1].field).toBe('medium1');
    expect(result.flatArray[0]).toBe('');
    expect(result.flatArray[1]).toBe('');
  });

  it('should map a deep form', () => {
    const result = mapDeep(R.prop('value'), deep);

    expect(result.field1).toBe('test');
    expect(result.fieldArray[0].field).toBe('medium0');
    expect(result.fieldArray[1].field).toBe('medium1');
    expect(result.fieldArray[1].nested[0]).toBe('');
  });
});
