import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SignUp from "../../pages/SignUp";
import Navbar from "./Navbar";
import NavList from "./Navlist";
import { useContext } from "react";
import { MyContext } from "../../App";

const LayOut: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  const {user, setUser} = useContext(MyContext)
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
    setUser(null)
  }
  
  return (
    <>
      <Box
        sx={{
          display: isLargeScreen ? "flex" : "block",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: isLargeScreen ? "inline-block" : "none",
            boxShadow: "4px 0px 4px 0px rgba(0, 0, 0, 0.06)",
            height: "100vh",
          }}
        >
          <NavList setDrawer={() => {}} handleLogout={handleLogout} user={user} />
        </Box>
        <Box
          width={"-webkit-fill-available"}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflowY: "scroll",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
            <Navbar handleLogout={handleLogout} user={user}/>
          {location.pathname == "/" ? <SignUp /> : children}
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default LayOut;