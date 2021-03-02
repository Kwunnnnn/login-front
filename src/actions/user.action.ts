import fetch from "../utils/fetch";

const url = `users`;

export const newUser = (body) => {
  const method = "POST";
  const path = `${url}`;

  return fetch(method, path, body);
};
