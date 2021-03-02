import fetch from "../utils/fetch";

const url = `auth`;

export const signIn = (body) => {
  const method = "POST";
  const path = `${url}/login`;

  return fetch(method, path, body);
};
