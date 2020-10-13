/**
 * Simple validation of email input
 */
export const isValidEmail = (email: string) => {
  const parts = email.split("@");
  return parts.length === 2 && parts.every((part) => part.length > 0);
};
