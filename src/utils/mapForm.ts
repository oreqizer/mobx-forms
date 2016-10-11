import * as R from 'ramda';

import { IDeepMap, DeepMapElem } from './types';


interface IFieldLike {
  __mobxField: boolean;
}

type FieldArrayUnit = IFieldLike | IFieldLike[] | IFieldsArrays;

interface IFieldsArrays extends Array<FieldArrayUnit> {
  [key: number]: FieldArrayUnit;
}

type FieldMapUnit = IFieldLike | IFieldLike[] | IFieldsMap[];

type FieldMapDeep = IFieldsMap | IFieldsMap[] | IFieldLike[];

interface IFieldsMap {
  [key: string]: FieldMapUnit;
}

const isField = R.has('__mobxField');

export const mapDeep = <T>(fn: (f: IFieldLike) => T, form: FieldMapDeep): IDeepMap<T> =>
    R.mapObjIndexed((val: FieldMapUnit): DeepMapElem<T> => {
      if (isField(val)) {
        return fn(<IFieldLike> val);
      }

      return mapDeep(fn, <FieldMapDeep> val);
    }, form);


const toArrays = (form: FieldMapUnit[]): IFieldsArrays =>
    R.map((val: FieldMapUnit): IFieldsArrays | IFieldLike => {
      if (isField(val)) {
        return <IFieldLike> val;
      }

      return toArrays(R.values<FieldMapUnit>(val));
    }, form);

export const mapFlat = <T>(fn: (f: IFieldLike) => T, form: IFieldsMap): Array<T> =>
    R.compose(
      R.map(fn),
      R.flatten,
      toArrays,
      R.values,
    )(form);
