import { User } from "./User";

export type AuthStore = {
  token: string | null;
  expiry: string | null;
  user: User | null;
  isAuthenticated: () => boolean;
  setAuth: setAuthType;
  setToken: (token: string | null, expiry: string | null) => void;
  clearAuth: () => void;
};

export type setAuthType = (
  token: string | null,
  expiry: string | null,
  user: User | null
) => void;
