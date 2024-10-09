import { axiosClient } from "../utils/axiosClient";
import { url } from "../utils/constant";

export const doSignUp = (payload: Record<string, unknown>) => {
  const endPoint = url.SIGNUP;
  return axiosClient("POST", endPoint, payload);
};
export const doLogin = (payload: Record<string, unknown>) => {
  const endPoint = url.LOGIN;
  return axiosClient("POST", endPoint, payload);
};

export const doUpdate = (payload: Record<string, unknown>) => {
  const endPoint = url.UPDATE_ACCOUNT;
  return axiosClient("POST", endPoint, payload);
};

export const deleteAccount = () => {
  const endPoint = url.DELETE_ACCOUNT;
  return axiosClient("DELETE", endPoint, {});
};

export const uploadInBulk = (payload: Record<string, unknown>) => {
  const endPoint = url.UPLOAD_BULK;
  return axiosClient("POST", endPoint, payload);
};
