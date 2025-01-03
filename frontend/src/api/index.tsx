import qs from "query-string";

const API_URL = import.meta.env.VITE_API_ROUTE || "";

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected error.");
  }
}

function stringifySearch(searchObj: Record<string, any>) {
  return typeof searchObj === "object" && Object.keys(searchObj).length
    ? "?" + qs.stringify(searchObj, { arrayFormat: "comma" })
    : "";
}

export const post = async (
  token: string,
  path: string,
  data: Record<string, any> = {},
  search: Record<string, any> = {},
  headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
) => {
  const response = await fetch(
    `${API_URL}/${path}${stringifySearch(search)}/`,
    {
      method: "POST",
      headers: { ...headers, Authorization: `Token ${token}` },
      body: JSON.stringify(data),
    }
  );
  const result = response.json();
  if (response.ok) return result;
  throw new UnexpectedError();
};

export const get = async (path: string, search: Record<string, any> = {}) => {
  const response = await fetch(
    `${API_URL}/${path}${stringifySearch(search)}/`,
    {
      method: "GET",
    }
  );
  const result = response.json();
  if (response.ok) return result;
  throw new UnexpectedError();
};

export const patch = async (
  token: string,
  path: string,
  data: Record<string, any> = {},
  search: Record<string, any> = {},
  headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
) => {
  const response = await fetch(
    `${API_URL}/${path}/${stringifySearch(search)}`,
    {
      method: "PATCH",
      headers: { ...headers, Authorization: `Token ${token}` },
      body: JSON.stringify(data),
    }
  );
  const result = response.json();
  if (response.ok) return result;
  throw new UnexpectedError();
};
