const ACCESS_TOKEN_KEY = "access_token_v1";

export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);

export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
