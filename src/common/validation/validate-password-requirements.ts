import { Try } from "../try";

const minLength = 8;
const minNumeric = 1;

export const validatePasswordRequirements = (
  password: string
): Try<undefined> => {
  if (password.length < minLength) {
    return {
      success: false,
      error: `Password must be at least ${minLength} character(s)`,
    };
  }

  const chars = password.split("").filter((char) => !isNaN(parseInt(char, 10)));
  if (chars.length < minNumeric) {
    return {
      success: false,
      error: `Password must have at least ${minNumeric} number(s)`,
    };
  }

  return { success: true };
};
