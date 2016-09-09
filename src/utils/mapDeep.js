import R from 'ramda';

const mapDeep = (fn, form) => R.map(val => // eslint-disable-line no-confusing-arrow
  R.isArrayLike(val) ?
  R.map(R.partial(mapDeep, [fn]), val) :
  fn(val), form);

export default mapDeep;
