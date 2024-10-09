import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { Box } from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import {
  Label,
  LoginFormSection,
  MyformControl,
} from "../../assets/styles/styled";
import { validateLoginForm } from "../../validations/UserSchema";
import FormInputButton from "../common/Button";
import { InputField, PasswordFormInputField } from "../common/InputField";
import { LoginType } from "../../interfaces/interface";

const LoginForm: React.FC<{
  handleSubmit: (values: LoginType) => void;
  isLoading: boolean;
}> = ({  handleSubmit, isLoading }) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    identifier: "",
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
      <LoginFormSection className="customBox">
        <Box sx={{ mt: 2 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validateLoginForm}
            validateOnChange={true}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form autoComplete="off">
                <MyformControl>
                  <Label
                    shrink
                    className="labelDesign"
                    htmlFor="identifier"
                    aria-labelledby="identifier"
                  >
                    Email/Username
                  </Label>
                  <InputField
                    name="identifier"
                    className="identifier"
                    label=""
                    id="identifier"
                  />
                </MyformControl>
                <MyformControl style={{ marginTop: "2rem" }}>
                  <Label
                    shrink
                    className="labelDesign"
                    aria-labelledby="Password"
                  >
                    Password
                  </Label>
                  <PasswordFormInputField
                    className="password"
                    label=""
                    name="password"
                    id="password"
                    data-testid="password"
                    type={showPassword ? "text" : "password"}
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
                  name="loginButton"
                  isLoading={isLoading}
                  text="Log in"
                />
              </Form>
            )}
          </Formik>
        </Box>
      </LoginFormSection>
    </>
  );
};
export default LoginForm;
