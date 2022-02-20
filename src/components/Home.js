import useUser from "../hooks/useUser";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Menu from "./Menu/Menu";
import RecipeListContainer from "./RecipeList/RecipeListContainer";

const menuContainer = {
  display: "flex",
  flexDirection: "column",
  minHeight: "75vh",
  justifyContent: "center",
};

export default function Home() {
  const { isLogged, menuUser } = useUser();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      navigateTo("/login");
    }
  }, [isLogged]);
  // console.log(menuUser.length);

  return (
    <>
      <Box>
        <Box sx={menuContainer}>
          {menuUser.length != 0 ? (
            <Menu />
          ) : (
            <Typography>
              Your menu is still empty. Search and add recipes{" "}
              <a href="#menuList" onClick={window.scroll(0, 500)}>
                here ⇓
              </a>
            </Typography>
          )}
        </Box>
        <RecipeListContainer />
      </Box>
    </>
  );
}
