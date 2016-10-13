import * as R from 'ramda';


export interface IFieldLike {
  __mobxField: boolean;
}

// Nested Field array
// ---
export type FieldArrayUnit = IFieldLike | IFieldLike[] | IFieldsArrays;

export interface IFieldsArrays extends Array<FieldArrayUnit> {
  [key: number]: FieldArrayUnit;
}

// Deep Field map
// ---
export type FieldMapUnit = IFieldLike | IFieldLike[] | IFieldsMap[];

export type FieldMapDeep = IFieldsMap | IFieldsMap[] | IFieldLike[];

export interface IFieldsMap {
  [key: string]: FieldMapUnit;
}

// Deep mapping result
// ---
export type Mapped<T> = T | Array<T> | IMappedObject<T>;

export interface IMappedObject<T> {
  [key: string]: Mapped<T>;
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
