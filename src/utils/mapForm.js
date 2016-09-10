/* eslint-disable no-confusing-arrow */
import R from 'ramda';

const isField = R.has('__mobxField');

export const mapDeep = (fn, form) => R.map(val =>
  isField(val) ?
  fn(val) :
  mapDeep(fn, val), form);

const toArrays = R.map(val =>
  isField(val) ?
  val :
  toArrays(R.values(val)));

export const mapFlat = (fn, form) => R.compose(
  R.map(fn),
  R.flatten,
  toArrays,
  R.values,
)(form);
