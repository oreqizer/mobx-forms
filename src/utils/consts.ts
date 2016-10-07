export const MOBX_FORMS = 'mobxForms';

export const INPUT_PROPS = [
  'autocomplete',
  'checked',
  'height',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'required',
  'size',
  'selected',
  'spellCheck',
  'step',
  'type',
  'value',
  'width',
  'onChange',
  'onFocus',
  'onBlur',
];

export const META_PROPS = [
  'active',
  'dirty',
  'error',
  'touched',
  'visited',
];

export const IGNORE_PROPS = [
  ...INPUT_PROPS,
  ...META_PROPS,
  'component',
  'defaultValue',
  'index',
  'normalize',
  'validate',
];

export const ARRAY_IGNORE_PROPS = [
  'name',
  'validate',
  'defaultValue',
];
