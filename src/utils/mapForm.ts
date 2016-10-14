import * as R from 'ramda';

import { IField } from "../containers/FieldStore";


// Nested array
// ---
export type ArrayUnit<T> = T | T[] | IArrays<T>;

export interface IArrays<T> extends Array<ArrayUnit<T>> {
  [key: number]: ArrayUnit<T>;
}

// Deep mapping result
// ---
export type Mapped<T> = T | MappedWrap<T>;

export type MappedWrap<T> = IMappedObject<T> | IMappedArray<T>

export interface IMappedArray<T> extends Array<Mapped<T>> {
  [key: number]: Mapped<T>;
}

export interface IMappedObject<T> {  // TODO tell TS it has a 'map' method from Ramda
  [key: string]: Mapped<T>;
}

const isField = (thing: any): thing is IField => R.has('__mobxField', thing);

/**
 * Recursively walks the whole form and maps each field. Maintains the forms tructure.
 *
 * @param fn Mapping function. Recieves a POJO version of FieldStore.
 * @param form POJO version of FormStore's fields and it's innards.
 * @returns The mapped POJO FormStore fields.
 */
export const mapDeep = <T>(fn: (f: IField) => T, form: MappedWrap<IField>): MappedWrap<T> =>
    R.map((val: Mapped<IField>): Mapped<T> => {
      if (isField(val)) {
        return fn(val);
      }

      return mapDeep(fn, val);
    }, <any> form);  // see TODO above


const toArrays = (form: IMappedArray<IField>): IArrays<IField> =>
    R.map((val: Mapped<IField>): IArrays<IField> | IField => {
      if (isField(val)) {
        return val;
      }

      return toArrays(R.values<Mapped<IField>>(val));
    }, form);

/**
 * Flattens the whole form to an array of fields, then applies the mapping function.
 *
 * @param fn Mapping function. Recieves a POJO version of FieldStore.
 * @param form POJO version of FormStore's fields and it's innards.
 * @returns All flattened and mapped FormStore's fields.
 */
export const mapFlat = <T>(fn: (f: IField) => T, form: IMappedObject<IField>): Array<T> =>
    R.compose(
      R.map(fn),
      R.flatten,
      toArrays,
      R.values,
    )(form);
