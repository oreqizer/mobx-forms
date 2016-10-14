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
export type Mapped<T> = T | IMappedWrap<T>;

export type IMappedWrap<T> = IMappedObject<T> | IMappedArray<T>

export interface IMappedArray<T> extends Array<Mapped<T>> {
  [key: number]: Mapped<T>;
}

export interface IMappedObject<T> {  // TODO tell TS it has a 'map' method from Ramda
  [key: string]: Mapped<T>;
}

const isField = (thing: any): thing is IField => R.has('__mobxField', thing);

export const mapDeep = <T>(fn: (f: IField) => T, form: IMappedWrap<IField>): IMappedWrap<T> =>
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

export const mapFlat = <T>(fn: (f: IField) => T, form: IMappedObject<IField>): Array<T> =>
    R.compose(
      R.map(fn),
      R.flatten,
      toArrays,
      R.values,
    )(form);
