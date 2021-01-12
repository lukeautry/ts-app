export const range = <T>(val: number, iterator: (index: number) => T) => {
  const result = new Array<T>();

  for (let i = 0; i < val; i++) {
    result.push(iterator(i));
  }

  return result;
};
