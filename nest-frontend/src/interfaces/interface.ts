import { ButtonProps } from "@mui/material";

export interface User {
  name: string;
  email: string;
  dob: string;
  username: string;
  password: string;
}

export interface MessageInputProps {
  send: (value: string) => void;
}
export interface Message {
  sender: string;
  text: string;
}
export interface MessagesProps {
  messages: Message[];
  username: string;
}

export interface DateProp extends InputFieldProps {
  name: string;
  label: string;
  id: string;
}
export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  endadornment?: React.ReactNode;
  inputProps?: object;
  value?: string;
  emailfound?: boolean;
  error?: boolean | undefined;
  selected?: boolean;
  handleChange?: (value: string | undefined) => void;
  autoComplete?: string;
  type?: string;
}
export interface SignUpFormProps {
  handleSubmit: (values: User) => void;
  isLoading: boolean;
}

export interface LoginType {
  [key: string]: unknown;
  identifier: string;
  password: string;
}
export interface FormInputbuttonProps {
  isLoading: boolean;
  text: string;
  name?: string;
  variant?: ButtonProps["variant"];
}
export interface UpdateProfile {
  name: string;
  email: string;
  dob: string;
  username: string;
}
export interface PopUpboxProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}
export interface UpdateProfileFormProps {
  initialValues: UpdateProfile;
  handleSubmit: (values: UpdateProfile) => void;
  isEditable: boolean;
  isLoading: boolean;
  setEditable: (isEditable: boolean) => void;
  setOpen: (isPopUpOpen: boolean) => void;
  isPopUpOpen: boolean;
  handleConfirm: () => void;
}
export interface NavbarProps {
  user: User | null;
  handleLogout: () => void;
}
