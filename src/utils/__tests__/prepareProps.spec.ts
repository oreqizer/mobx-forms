import prepareProps from '../prepareProps';

const onChange = (id: any) => id;
const onFocus = (id: any) => id;
const onBlur = (id: any) => id;

const props = {
  // input
  // ---
  value: 1337,
  required: true,
  onChange,
  onFocus,
  onBlur,

  // meta
  // ---
  error: 'not enough peanuts',
  dirty: false,
  visited: false,
  touched: true,
  active: false,

  // custom
  // ---
  damage: 'tons of',
  wow: 'so test',
};

const props2 = Object.assign({}, props, {
  value: true,
});

describe('#prepareProps', () => {
  it('should separate input props', () => {
    const result: any = prepareProps(props);
    expect(result.input.value).toBe(1337);
    expect(result.input.required).toBe(true);
    expect(result.input.onChange).toBeDefined();
    expect(result.input.onFocus).toBeDefined();
    expect(result.input.onBlur).toBeDefined();
  });

  it('should separate meta props', () => {
    const result: any = prepareProps(props);
    expect(result.meta.error).toBe('not enough peanuts');
    expect(result.meta.dirty).toBe(false);
    expect(result.meta.visited).toBe(false);
    expect(result.meta.touched).toBe(true);
    expect(result.meta.active).toBe(false);
  });

  it('should separate custom props', () => {
    const result: any = prepareProps(props);
    expect(result.custom.damage).toBe('tons of');
    expect(result.custom.wow).toBe('so test');
  });

  it('should add a "checked" prop for boolean value', () => {
    const result: any = prepareProps(props2);
    expect(result.input.checked).toBe(true);
  });
});
