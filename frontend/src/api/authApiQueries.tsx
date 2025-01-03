import { post } from ".";
import { User } from "../types/User";

export type LoginType = { token: string; expiry: string; user: User };

export const login = async (
  username: string,
  password: string,
  search: Record<string, any> = {}
): Promise<LoginType> =>
  await post("", "login", { username, password }, search);

export const logout = async (token: string) => post(token, "logout");
