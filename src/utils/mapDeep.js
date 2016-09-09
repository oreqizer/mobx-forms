/* eslint-disable no-confusing-arrow */
import R from 'ramda';

import FieldStore from '../containers/FieldStore';

const mapArray = (fn, objfn, val) =>
  val instanceof FieldStore ?
  fn(val) :
  objfn(fn, val);

const mapDeep = (fn, form) => R.map(val =>
  R.isArrayLike(val) ?
  R.map(R.partial(mapArray, [fn, mapDeep]), val) :
  fn(val), form);

export default mapDeep;
