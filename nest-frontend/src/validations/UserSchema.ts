import * as Yup from "yup";
import { calculateAge } from "../utils/common/commonFunctions";

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(
      /^[A-Za-z ]*$/,
      "Name cannot contain numbers or special characters"
    ), // Ensures no numbers

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email must include a valid domain with a dot"
    ),

  dob: Yup.string()
    .required("Age is required")
    .test(
      "is-valid-range",
      "You must be at least 18 years old and not older than 50",
      function (value) {
        const age = calculateAge(value); // Calculate the age
        return Number(age) <= 50;
      }
    ),
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot exceed 20 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
});

export const validateLoginForm = Yup.object({
  identifier: Yup.string().required("Email/Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
});

export const validateUpdateProfileForm = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(
      /^[A-Za-z ]*$/,
      "Name cannot contain numbers or special characters"
    ), // Ensures no numbers
  dob: Yup.string()
    .required("Age is required")
    .test(
      "is-valid-range",
      "You must be at least 18 years old and not older than 50",
      function (value) {
        const age = calculateAge(value); // Calculate the age
        return Number(age) <= 50;
      }
    ),
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot exceed 20 characters"),
});
