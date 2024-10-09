import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
export const MyformControl = styled(FormControl)({
  width: "100%",
  // marginTop: "15px !important"
});
export const Label = styled(InputLabel)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightRegular,
  // color: theme.palette.common.black,
  fontSize: "0.9rem",
  position: "relative",
  transform: "unset",
}));
export const SubmitButton = styled(Button)(() => ({
  marginTop: "1.5rem",
  height: "43px",
  borderRadius: "12px",
}));
export const Nav = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  [theme.breakpoints.up("lg")]: {
    width: "224px",
    display: "flex",
    flexDirection: "column",
  },
  "@media (min-width: 1920px)": {
    width: "272px",
  },
}));
export const NavButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "48px",
  borderRadius: "12px",
  color: "black",
  lineHeight: "24px",
  fontSize: "16px",
  fontWeight: 500,
  textTransform: "none",
  justifyContent: "center",
  ":hover": {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
  },
  backgroundColor: "white",
  ".MuiButton-root:hover": {
    backgroundColor: "transparent",
  },
  [theme.breakpoints.up("lg")]: {
    justifyContent: "start",
    padding: "12px 16px 12px 16px",
  },
}));
export const NavButtonDiv = styled(Box)(({ theme }) => ({
  marginTop: "16px",
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    padding: "16px",

    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    // marginTop: '16px'
  },
  [theme.breakpoints.up("xl")]: {},
}));
export const ScreenWrapper = styled(Stack)(() => ({
  boxShadow: "5px 5px 5px 5px grey",
  width: "100%",
  height: "500px",
  borderRadius: "10px",
}));
export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "none",
  paddingLeft: "16px",
  paddingRight: "16px",
  [theme.breakpoints.up("sm")]: {
    padding: 0,
  },
}));
export const CustomDrawer = styled(Drawer)(() => ({
  ".MuiPaper-root": {
    padding: " 0.4rem 1rem",
  },
  ".MuiAppBar-root": {
    boxShadow: "none",
  },
}));
export const CustomToolBar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0px",
  ".MuiButtonBase-root": {
    // paddingLeft: "0px",
  },
}));
export const HeaderWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "852px",
    margin: "0 auto",
    ".MuiToolbar-root": {
      padding: "0",
    },
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: "1032px",
    margin: "0 auto",
    ".MuiToolbar-root": {
      padding: "0",
    },
  },
}));
export const ErrorMsg = styled(Typography)({
  fontSize: "14px !important",
  marginTop: "7px",
});
export const Input = styled(OutlinedInput)(() => ({
  backgroundColor: "#F0F1F4",
  border: "1px solid transparent",
  borderRadius: "12px !important",
  "&  .MuiOutlinedInput-root": {
    borderRadius: "12px",
  },

  "& .MuiInputBase-input": {
    fontWeight: 400,
    height: "13px",
    borderRadius: "12px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  "& .MuiButtonBase-root:hover": {
    backgroundColor: "inherit",
  },
}));
export const InputBar = styled(Stack)(() => ({
  marginTop: "auto",
  maxHeight: "75px",
  padding: "15px",
  columnGap: "20px",
}));

export const InputField = styled(TextField)(() => ({
  height: "45px",
  flexBasis: "85%",
  ".MuiOutlinedInput-root": {
    height: "100%",
    borderRadius: "50px",
  },
  ".MuiOutlinedInput-input": {
    height: "100%",
    paddingLeft: "15px",
    padding: "0 10px",
  },
}));

export const SendButton = styled(Button)(() => ({
  padding: "20px 6px",
  minWidth: "48px",
  borderRadius: "600px",
}));

export const MessagesList = styled(Stack)(() => ({
  height: "460px",
  display: "flex",
  flexDirection: "column",
  padding: "15px",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
}));

export const ChatMessage = styled(Box)(() => ({
  display: "block",
  color: "rgba(0, 0, 0, 0.87)",
  fontSize: "1.2rem",
}));
export const CustomContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  paddingTop: "24px",
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "402px",
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "508px",
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: "608px",
  },
}));
export const LoginFormSection = styled(Box)({
  textAlign: "left",
});
export const ButtonSection = styled(Box)(({ theme }) => ({
  height: "-webkit-fill-available",
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "end",
  [theme.breakpoints.up("lg")]: {
    margin: "0 auto",
    paddingBottom: "16px",
    padding: "16px",
  },
  [theme.breakpoints.up("xl")]: {},
}));
export const LogoutButton = styled(SubmitButton)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    // marginTop: '297px'
    width: "95%",
    margin: "0 auto",
  },
}));
