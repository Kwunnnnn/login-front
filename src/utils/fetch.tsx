import axios, { Method } from "axios";
import { AUTH_STORAGE_NAME, environment } from "../constants/environment";

const fetch = (
  method: Method = "get",
  endpoint = "/",
  body = {},
  headers = {},
  apiUrl = environment.API_URL,
  options = {}
) => {
  const url = `${apiUrl}/${endpoint}`;
  const data = body;
  const queryName = method === "GET" ? "params" : "data";

  const api = axios.create({
    baseURL: url,
  });

  api.interceptors.request.use((config) => {
    let accessToken = sessionStorage.getItem(AUTH_STORAGE_NAME);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  });

  const res = api.request({
    method,
    url,
    [queryName]: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
  });

  res.catch((error) => {
    console.error(error);
    if (error.response) {
      console.error(error.response);
    }
  });

  return Promise.resolve(res);
};

export default fetch;
