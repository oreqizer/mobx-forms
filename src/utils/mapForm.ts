import * as R from 'ramda';

import { Mapped, IMappedObject } from './../types/Mapped';


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

const isField = (thing: any): thing is IFieldLike => R.has('__mobxField', thing);

export const mapDeep = <T>(fn: (f: IFieldLike) => T, form: FieldMapDeep): IMappedObject<T> =>
    R.mapObjIndexed((val: FieldMapUnit): Mapped<T> => {
      if (isField(val)) {
        return fn(val);
      }

      return mapDeep(fn, val);
    }, form);


const toArrays = (form: FieldMapUnit[]): IFieldsArrays =>
    R.map((val: FieldMapUnit): IFieldsArrays | IFieldLike => {
      if (isField(val)) {
        return val;
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
