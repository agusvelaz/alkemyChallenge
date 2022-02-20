import useUser from "../../hooks/useUser";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";




const pages = ["a"];
const navBar={
  a:{
    textDecoration:"none",
    color:"primary.contrastText"
  }
}


export default function NavBar() {
  const { isLogged, logout } = useUser();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // console.log(isLogged)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (<>
    <AppBar position="static" sx={navBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: "flex" }}
          >
            MPH
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display:"flex" }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Log in to access"> */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avatar" src="" />
              </IconButton>
            {/* </Tooltip> */}

            {isLogged ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="log" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => logout()}>Logout</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <></>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
