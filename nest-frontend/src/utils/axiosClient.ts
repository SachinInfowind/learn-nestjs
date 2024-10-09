import axios, { AxiosRequestConfig } from "axios";
import { BASEURL } from "./constant";
import { getToken } from "./common/commonFunctions";
import { CSV_UPLOAD_URL } from "./constant";
const client = axios.create({});

client.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosClient = async (
  method: "POST" | "PUT" | "DELETE" | "GET" | "PATCH" = "GET",
  endPoint: string,
  payload: Record<string, unknown>
) => {
  console.log(endPoint);
  const axiosConfig: AxiosRequestConfig = {
    url: `${BASEURL}${endPoint}`,
    method: method.toLowerCase(),
  };
  if (method != "GET") {
    axiosConfig.data = payload;
  }
  axiosConfig.headers = {
    Authorization: getToken(),
  };
  if (endPoint.includes("upload-bulk")) {
    axiosConfig.url = `${CSV_UPLOAD_URL}${endPoint}`;
  }
  return await client(axiosConfig);
};
