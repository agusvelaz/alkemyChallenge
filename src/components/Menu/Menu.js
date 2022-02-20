import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import RecipeListMenu from "./RecipeListMenu";
import MenuOverview from "./MenuOverview";
const menu ={
  maxWidth:"lg",
  margin:"auto",

}

export default function Menu() {
  
  return (
    <Box sx={menu}>
      <RecipeListMenu/>
      <Box>
      <MenuOverview />
      </Box>
    </Box>
  );
}
