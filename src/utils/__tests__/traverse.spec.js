import { nameIndex, traverse, traverseInit } from '../traverse';

jest.unmock('../traverse');
jest.unmock('ramda');

const part = 'people[1]';

const partLong = 'doges[1337]';

describe('#nameIndex', () => {
  it('should partition part correctly', () => {
    const { name, index } = nameIndex(part);

    expect(name).toBe('people');
    expect(index).toBe(1);
  });

  it('should partition part with big index correctly', () => {
    const { name, index } = nameIndex(partLong);

    expect(name).toBe('doges');
    expect(index).toBe(1337);
  });
});

const flat = {
  people: [{
    value: 'test',
  }, {
    value: 'test2',
  }],
};

const deep = {
  doges: [{
    value: 'doge',
    foods: [{
      value: 'bone',
      nutrition: [{
        value: '1337kcal',
      }, {
        value: '420kcal',
      }],
    }],
  }],
};

describe('#traverse', () => {
  it('should find a field in flat fields', () => {
    const result = traverse(flat, 'people[1]');

    expect(result).toEqual({ value: 'test2' });
  });

  it('should not find a field in flat fields', () => {
    const result = traverse(flat, 'people[2]');

    expect(result).toBeNull();
  });

  it('should find a field in deep fields', () => {
    const result = traverse(deep, 'doges[0].foods[0].nutrition[1]');

    expect(result).toEqual({ value: '420kcal' });
  });

  it('should not find a field in deep fields', () => {
    const result = traverse(deep, 'doges[0].people[0].nutrition[1]');

    expect(result).toBeNull();
  });
});

describe('#traverseTail', () => {
  it('should not find a field in flat fields', () => {
    const result = traverseInit(flat, 'people[1]');

    expect(result).toBeNull();
  });

  it('should find a field in fields', () => {
    const result = traverseInit(deep, 'doges[0].foods[0].nutrition[1]');

    expect(result).toEqual({
      value: 'bone',
      nutrition: [{
        value: '1337kcal',
      }, {
        value: '420kcal',
      }],
    });
  });

  it('should not find a field in fields', () => {
    const result = traverseInit(deep, 'doges[0].people[0].nutrition[1]');

    expect(result).toBeNull();
  });
});
