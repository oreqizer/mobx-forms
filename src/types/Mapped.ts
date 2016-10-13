export type Mapped<T> = T | Array<T> | IMappedObject<T>;

export interface IMappedObject<T> {
  [key: string]: Mapped<T>;
}
