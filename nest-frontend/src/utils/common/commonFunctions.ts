import { User } from "../../interfaces/interface";

export const calculateAge = (birthdate: string): string => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust if the birthday has not occurred yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age.toString();
};

export const getToken = () => {
  const response = localStorage.getItem("token") || "token";
  return response;
};
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
export const setUserIntoLocal = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "");
};
