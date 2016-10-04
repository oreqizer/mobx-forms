import R from 'ramda';

import { INPUT_PROPS, META_PROPS, IGNORE_PROPS } from './consts';

const maybeCheckProps = all => {
  if (typeof all.value === 'boolean') {
    return R.merge(all, { checked: all.value });
  }
  return all;
};

const separateProps = all => ({
  input: R.pick(INPUT_PROPS, all),
  meta: R.pick(META_PROPS, all),
  custom: R.omit(IGNORE_PROPS, all),
});

// Order matters!
// Separate always last
export default R.compose(separateProps, maybeCheckProps);
