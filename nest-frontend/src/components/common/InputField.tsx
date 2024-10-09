import { useField } from "formik";
import { ErrorMsg, Input } from "../../assets/styles/styled";
import { DateProp, InputFieldProps } from "../../interfaces/interface";

export const InputField: React.FC<InputFieldProps> = ({
    ...props
  }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <Input
          fullWidth
          {...field}
          {...props}
          color="secondary"
          size="medium"
          error={!!meta.error && meta.touched}
        />
        {meta.error && meta.touched ? (
          <ErrorMsg variant="body2" color="error">
            {meta.error}
          </ErrorMsg>
        ) : (
          ""
        )}
      </>
    );
  };

  export const DateInputField: React.FC<DateProp> = ({ ...props }) => {
    const [field, meta] = useField(props);
  
    return (
      <>
        <Input
          inputProps={{ max: new Date().toISOString().split("T")[0] }}
          type="date"
          error={!!meta.error && meta.touched}
          {...field}
          {...props}
          
        />
        {meta.error && meta.touched ? (
          <ErrorMsg variant="body2" color="error">
            {meta.error}
          </ErrorMsg>
        ) : (
          ""
        )}
      </>
    );
  };
  
  export const PasswordFormInputField: React.FC<InputFieldProps> = ({
    ...props
  }) => {
    const [field, meta] = useField(props);
  
    return (
      <>
        <Input
          fullWidth
          {...field}
          {...props}
          color="secondary"
          size="medium"
          endAdornment={props.endadornment}
          error={!!meta.error && meta.touched}
        />
        {meta.error && meta.touched ? (
          <ErrorMsg variant="body2" color="error">
            {meta.error}
          </ErrorMsg>
        ) : (
          ""
        )}
      </>
    );
  };