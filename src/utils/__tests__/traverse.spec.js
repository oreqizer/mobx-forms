import traverse from '../traverse';

const flat = {
  group: { value: 'gym' },
  people: [{
    name: { value: 'test' },
  }, {
    name: { value: 'test2' },
  }],
};

const deep = {
  doges: [{
    name: { value: 'doge' },
    foods: [{
      name: { value: 'meat' },
      types: [
        { value: 'steak' },
        { value: 'wing' },
      ],
    }],
  }],
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

  it('should not find fields in flat fields', () => {
    const result = traverse(flat, 'people#2');

    expect(result).toBeNull();
  });

  it('should find fields in deep fields', () => {
    const result = traverse(deep, 'doges#0.foods#0.types#1');

    expect(result).toEqual(deep.doges[0].foods[0].types[1]);
  });

  it('should find a member in deep fields', () => {
    const result = traverse(deep, 'doges#0.foods');

    expect(result).toEqual(deep.doges[0].foods);
  });

  it('should not find fields in deep fields', () => {
    const result = traverse(deep, 'doges#0.people#0.nutrition#1');

    expect(result).toBeNull();
  });
});
