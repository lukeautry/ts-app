export const expectError = async (
  fn: () => Promise<unknown>,
  message = "expected error"
): Promise<Error> => {
  try {
    await fn();
  } catch (err) {
    return err;
  }

  throw new Error(message);
};
