import R from 'ramda';

import { INPUT_PROPS, META_PROPS, IGNORE_PROPS } from './consts';

export const separateProps = all => ({
  input: R.pick(INPUT_PROPS, all),
  meta: R.pick(META_PROPS, all),
  custom: R.omit(IGNORE_PROPS, all),
});

export const valueFromEv = ev => ev.target.value; // TODO react native support
