// TODO: write tests/flow annotations
import R from 'ramda';

import { INPUT_PROPS, META_PROPS, IGNORE_PROPS } from './consts';

const separateProps = all => ({
  input: R.pick(INPUT_PROPS, all),
  meta: R.pick(META_PROPS, all),
  custom: R.omit(IGNORE_PROPS, all),
});

const maybeCheckProps = all => {
  if (typeof all.value === 'boolean') {
    return R.merge(all, { checked: all.value });
  }
  return all;
};

export default R.compose(maybeCheckProps, separateProps);
