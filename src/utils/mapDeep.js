/* eslint-disable no-confusing-arrow */
import R from 'ramda';

import FieldStore from '../containers/FieldStore';

const mapDeep = (fn, form) => R.map(val =>
  val instanceof FieldStore ?
  fn(val) :
  mapDeep(fn, val), form);

export default mapDeep;
