import {  useMediaQuery, useTheme } from "@mui/material";
import {
  ButtonSection,
  LogoutButton,
  Nav,
  NavButton,
  NavButtonDiv,
} from "../../assets/styles/styled";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../../interfaces/interface";
export interface NavListProps{
  setDrawer: (status: boolean) => void;
  handleLogout : () => void;
  user :User | null
}
export const NavList:React.FC<NavListProps> = ({
  setDrawer,
  handleLogout,
  user
}) => {
  
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

 

  return (
    <>
      <Nav role="presentation">
      {!isLargeScreen && <CloseIcon onClick={() => setDrawer(false)} sx={{float : 'right'}} />}
        <NavButtonDiv display = { "block" }>
          <NavButton
            onClick={() => navigate("/signup")}
            sx={{
              backgroundColor:
                route == "/signup" || route == "/" ? "#E6F4F9" : "transparent",
              color: route == "/signup" || route == "/" ? "#076EB0" : "black",
            }}
            disabled ={user ?  true : false}
          >
            SignUp
          </NavButton>
          <NavButton
            onClick={() => navigate("/login")}
            sx={{
              backgroundColor:
                route == "/login" ? "#E6F4F9" : "transparent",
              color: route == "/login" ? "#076EB0" : "black",
            }}
            disabled ={user ?  true : false}
          >
            Login
          </NavButton>
          <NavButton
            onClick={() => navigate("/view-profile")}
            sx={{
              backgroundColor:
                route == "/view-profile" ? "#E6F4F9" : "transparent",
              color: route == "/view-profile" ? "#076EB0" : "black",
            }}
            disabled ={!user}
          >
            Profile
          </NavButton>
          <NavButton
            onClick={() => navigate("/chat")}
            sx={{
              backgroundColor: route == "/chat" ? "#E6F4F9" : "transparent",
              color: route == "/chat" ? "#076EB0" : "black",
            }}
          >
            Chat
          </NavButton>
          <NavButton
            onClick={() => navigate("/bulk-upload")}
            sx={{
              backgroundColor: route == "/bulk-upload" ? "#E6F4F9" : "transparent",
              color: route == "/bulk-upload" ? "#076EB0" : "black",
            }}
          >
            Upload in Bulk
          </NavButton>
        </NavButtonDiv>
        <ButtonSection>
          <LogoutButton
            onClick={handleLogout}
            variant="outlined"
            fullWidth
            className="logout"
          >
            Log out
          </LogoutButton>
        </ButtonSection>
      </Nav>
    </>
  );
};
export default NavList;