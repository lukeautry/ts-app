export type Try<T = undefined, E = string> = T extends undefined
  ? { success: true } | ITryError<E>
  : ITrySuccess<T> | ITryError<E>;

interface ITrySuccess<T> {
  success: true;
  val: T;
}

export interface ITryError<E> {
  success: false;
  error: E;
}

export const error = <E>(error: E): ITryError<E> => ({
  success: false,
  error,
});
