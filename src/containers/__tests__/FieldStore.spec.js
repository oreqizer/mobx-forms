import FieldStore from '../FieldStore';

describe('#FieldStore', () => {
  let field = null;

  beforeEach(() => {
    field = new FieldStore({
      validate: () => null,
      defaultValue: '',
    });
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

  it('should have an error', () => {
    field.validate = value => value.length > 5 ? null : 'short';

    expect(field.error).toBe('short');
  });

  it('should be dirty', () => {
    field.defaultValue = 'doge';

    expect(field.dirty).toBe(true);
  });
});
