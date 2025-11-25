class SetToNull {}

export const setToNull = new SetToNull();

export type NullableSetter<T> = T | null | SetToNull;