import {
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { useState } from "react";
  import MenuIcon from "@mui/icons-material/Menu";
  import {
    CustomAppBar,
    CustomDrawer,
    CustomToolBar,
    HeaderWrapper,
  } from "../../assets/styles/styled";
  import { NavList } from "./Navlist";
  import { useNavigate } from "react-router-dom";
import { NavbarProps } from "../../interfaces/interface";


  const Navbar: React.FC<NavbarProps> = ({ user, handleLogout }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [isDrawerOpen, setDrawer] = useState(false);
    
    const handleMenu = () => {
      setDrawer(true);
    };
  
    return (
      <>
        <HeaderWrapper>
          <CustomAppBar position="static">
            <CustomToolBar>
              <Box
                display={"flex"}
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/account")}
              >
                <Typography
                  variant="subtitle1"
                  color={"black"}
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  {user?.name || ""}
                </Typography>
              </Box>
  
              <div>
                <IconButton
                  sx={{ display: isLargeScreen ? "none" : "block" }}
                  size="large"
                  edge="end"
                  color="default"
                  aria-label="menu"
                  onClick={handleMenu}
                  data-testid="menu"
                >
                  <MenuIcon />
                </IconButton>
                <CustomDrawer
                  anchor={isLargeScreen ? "left" : "top"}
                  open={isLargeScreen ? false : isDrawerOpen}
                >
                  {<NavList setDrawer={setDrawer} handleLogout={handleLogout} user={user} />}
                </CustomDrawer>
              </div>
            </CustomToolBar>
          </CustomAppBar>
        </HeaderWrapper>
      </>
    );
  };
  export default Navbar;