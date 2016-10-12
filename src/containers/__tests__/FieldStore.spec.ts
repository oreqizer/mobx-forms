import FieldStore from '../FieldStore';

describe('#FieldStore', () => {
  let field = new FieldStore();

  beforeEach(() => {
    field = new FieldStore();
  });

  it('should initialize properly', () => {
    expect(field.value).toBe('');
    expect(field.visited).toBe(false);
    expect(field.touched).toBe(false);
    expect(field.active).toBe(false);
    expect(field.error).toBeNull();
    expect(field.dirty).toBe(false);
  });

  it('should return props', () => {
    expect(field.props).toEqual({
      value: '',
      visited: false,
      touched: false,
      active: false,
      error: null,
      dirty: false,
    });
  });
});
