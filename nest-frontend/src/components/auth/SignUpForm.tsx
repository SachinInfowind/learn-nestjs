import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { Formik, Form } from "formik";
import { Label, MyformControl } from "../../assets/styles/styled";
import { validationSchema } from "../../validations/UserSchema";
import { InputField, PasswordFormInputField } from "../common/InputField";
import { DateInputField } from "../common/InputField";
import { SignUpFormProps, User } from "../../interfaces/interface";
import FormInputButton from "../common/Button";

const SignUpForm: React.FC<SignUpFormProps> = ({ handleSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: User = {
    name: "",
    email: "",
    dob: "",
    username: "",
    password: "",
  };
  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {/* <Typography variant="body2" mt={1}>
        Through an individual invitation
      </Typography> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form autoComplete={"off"}>
            <MyformControl>
              <Label shrink className="labelDesign" htmlFor="name">
                Full name
              </Label>
              <InputField
                name="name"
                className="name"
                label=""
                id="name"
                //   value={values.firstName}
              />
            </MyformControl>
            <MyformControl sx={{ mt: "2rem" }}>
              <Label shrink className="labelDesign" htmlFor="email">
                Email
              </Label>
              <InputField
                name="email"
                className="email"
                label=""
                id="email"
                value={values.email}
              />
            </MyformControl>
            <MyformControl sx={{ mt: "1.5rem" }}>
              <Label shrink className="labelDesign" htmlFor="Date of Birth">
                Date of Birth
              </Label>
              <DateInputField name="dob" label="" id="Date of Birth" />
            </MyformControl>
            <MyformControl sx={{ mt: "1.5rem" }}>
              <Label shrink className="labelDesign" htmlFor="First name">
                Username
              </Label>
              <InputField
                name="username"
                className="username"
                label=""
                id="username"
                //   value={values.firstName}
              />
            </MyformControl>
            <MyformControl sx={{ mt: "1.5rem" }}>
              <Label shrink className="labelDesign">
                Password
              </Label>
              <PasswordFormInputField
                value={values.password}
                data-testid="pass"
                className="password"
                label=""
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                endadornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </MyformControl>
            <FormInputButton
              name="signUpButton"
              isLoading={isLoading}
              text="Create Account"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignUpForm;
