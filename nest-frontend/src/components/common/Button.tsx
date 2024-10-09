import { CircularProgress } from "@mui/material";
import { SubmitButton } from "../../assets/styles/styled";
import { FormInputbuttonProps } from "../../interfaces/interface";

const FormInputButton: React.FC<FormInputbuttonProps> = ({
  isLoading,
  text,
  name,
  variant = "contained",
}) => {
  return (
    <>
      <SubmitButton name={name} fullWidth variant={variant} type="submit">
        {isLoading ? (
          <CircularProgress sx={{ p: 0.6 }} color="inherit" />
        ) : (
          text
        )}
      </SubmitButton>
    </>
  );
};
export default FormInputButton;