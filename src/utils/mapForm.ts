import * as R from 'ramda';

import FieldStore from '../containers/FieldStore';

import { FormObject, FormElement, IDeepMap, DeepMapElem } from './types';

type MapUnit<T> = FieldStore | Array<FieldStore> | Array<IMapInput<T>>;

interface IMapInput<T> {
  [key: string]: MapUnit<T>;
}

export const mapDeep = <T>(fn: (f: FieldStore) => T, form: Input): IDeepMap<T> =>
    R.mapObjIndexed((val: Input): DeepMapElem<T> => {
      if (val instanceof FieldStore) {
        return fn(val);
      }

      return mapDeep(fn, val);
    }, form);


const toArrays = <T>(form: Array<MapUnit<T>>) =>
    R.map((val: MapUnit<T>): MapUnit<T> | Array<MapUnit<T>> => {
      if (Array.isArray(val) || val instanceof FieldStore) {
        return val;
      }

      const arr: Array<MapUnit<T>> = R.values<MapUnit<T>>(val);
      return toArrays(arr);
    }, form);

export const mapFlat = <T>(fn: (f: FieldStore) => T, form: IMapInput<T>): Array<T> =>
    R.compose(
      R.map(fn),
      R.flatten,
      toArrays,
      R.values,
    )(form);
