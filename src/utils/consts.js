export const MOBX_FORMS = 'mobxForms';

export const INPUT_PROPS = [
  'autocomplete',
  'height',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'required',
  'size',
  'spellcheck',
  'step',
  'type',
  'value',
  'width',
  'onChange',
  'onFocus',
  'onBlur',
];

export const META_PROPS = [
  'error',
  'valid',
  'pristine',
  'dirty',
  'active',
  'touched',
];

export const IGNORE_PROPS = [
  ...INPUT_PROPS,
  ...META_PROPS,
  'component',
  'validate',
  'normalize',
];
