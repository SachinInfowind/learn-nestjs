import { Form, Formik } from "formik";
import { Label, MyformControl, SubmitButton } from "../../assets/styles/styled";
import { DateInputField, InputField } from "../common/InputField";
import { validateUpdateProfileForm } from "../../validations/UserSchema";
import {  UpdateProfileFormProps } from "../../interfaces/interface";
import FormInputButton from "../common/Button";
import PopUpbox from "../common/PopUpBox";


const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  handleSubmit,
  initialValues,
  isEditable,
  isLoading,
  setEditable,
  setOpen,
  isPopUpOpen,
  handleConfirm,
}) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateUpdateProfileForm}
        enableReinitialize={true}
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
                value={values.name}
                disabled={!isEditable}
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
                disabled
              />
            </MyformControl>
            <MyformControl sx={{ mt: "1.5rem" }}>
              <Label shrink className="labelDesign" htmlFor="Date of Birth">
                Date of Birth
              </Label>
              <DateInputField
                name="dob"
                label=""
                id="Date of Birth"
                value={values.dob}
                disabled={!isEditable}
              />
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
                value={values.username}
                disabled={!isEditable}
              />
            </MyformControl>
            {isEditable ? (
              <FormInputButton
                name="signUpButton"
                isLoading={isLoading}
                text="update"
              />
            ) : (
              <SubmitButton
                onClick={() => setEditable(true)}
                fullWidth
                variant="contained"
              >
                Edit
              </SubmitButton>
            )}
            <SubmitButton
              variant="outlined"
              onClick={() => setOpen(true)}
              fullWidth
              color="error"
            >
              Delete account
            </SubmitButton>
            <PopUpbox
              open={isPopUpOpen}
              handleClose={() => setOpen(false)}
              handleConfirm={handleConfirm}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
export default UpdateProfileForm;
