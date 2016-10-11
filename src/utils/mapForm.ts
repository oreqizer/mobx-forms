import { isObservableObject } from 'mobx';
import * as R from 'ramda';

import FieldStore from '../containers/FieldStore';

import { FormObject, FormElement, IDeepMap, DeepMapElem } from './types';


type Input = FormElement | FieldStore;

export const mapDeep = <T>(
    fn: (f: FieldStore) => T, form: Input
): IDeepMap<T> =>
  R.mapObjIndexed((val: Input): DeepMapElem<T> => {
    if (val instanceof FieldStore) {
      return fn(val);
    }

    return mapDeep(fn, val);
  }, form);


const toArrays = R.map((val: Input): Input | Array<Input> => {
  if (isObservableObject(val)) {
    return R.values<Input>(val);
  }

  return val;
});

export const mapFlat = <T>(
    fn: (f: FieldStore) => T, form: FormObject
): Array<T> => R.compose(
  R.map(fn),
  R.flatten,
  toArrays,
  R.values,
)(form);
