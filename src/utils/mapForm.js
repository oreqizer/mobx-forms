/* eslint-disable no-confusing-arrow */
import R from 'ramda';

import FieldStore from '../containers/FieldStore';

export const mapDeep = (fn, form) => R.map(val =>
  val instanceof FieldStore ?
  fn(val) :
  mapDeep(fn, val), form);

const toArrays = R.map(val =>
  val instanceof FieldStore ?
  val :
  toArrays(R.values(val)));

export const mapFlat = (fn, form) => R.compose(
  R.map(fn),
  R.flatten,
  toArrays,
  R.values,
)(form);
