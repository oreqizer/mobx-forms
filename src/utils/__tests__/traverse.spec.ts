import { observable } from 'mobx';
import traverse from '../traverse';

import FieldStore from '../../containers/FieldStore';


const flat = {
  group: new FieldStore({ value: 'gym' }),
  people: observable([{
    name: new FieldStore({ value: 'test' }),
  }, {
    name: new FieldStore({ value: 'test2' }),
  }]),
};

const deep = {
  doges: observable([{
    name: new FieldStore({ value: 'doge' }),
    foods: observable([{
      name: new FieldStore({ value: 'meat' }),
      types: observable([
        new FieldStore({ value: 'steak' }),
        new FieldStore({ value: 'wing' }),
      ]),
    }]),
  }]),
};

describe('#traverse', () => {
  it('should return root if no context supplied', () => {
    const result = traverse(flat, '');

    expect(result).toEqual(flat);
  });

  it('should find a member in flat fields', () => {
    const result = traverse(flat, 'group');

    expect(result).toEqual(flat.group);
  });

  it('should find fields in flat fields', () => {
    const result = traverse(flat, 'people#1');

    expect(result).toEqual(flat.people[1]);
  });

  it('should return latest match if no match is found', () => {
    const result = traverse(flat, 'people#2');

    expect(result).toEqual(flat);
  });

  it('should find fields in deep fields', () => {
    const result = traverse(deep, 'doges#0.foods#0.types#1');

    expect(result).toEqual(deep.doges[0].foods[0].types[1]);
  });

  it('should find a member in deep fields', () => {
    const result = traverse(deep, 'doges#0.foods');

    expect(result).toEqual(deep.doges[0].foods);
  });
});
