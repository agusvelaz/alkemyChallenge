import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

const informationIcon = {
  fontSize: 30,
  marginRight: 1,
};

export default function RecipeInfo({ recipeDetail }) {
//   console.log(recipeDetail);
  return (
    <>
      <Box component="span">
        <Tooltip title="Price Per Serving">
          <MonetizationOnIcon sx={informationIcon} />
        </Tooltip>
        <Typography variant="h5" component="div">
          {recipeDetail.pricePerServing}
        </Typography>
      </Box>
      <Box component="span">
        <Tooltip title="Ready in">
          <AccessTimeFilledIcon sx={informationIcon} />
        </Tooltip>
        <Typography variant="h5" component="div">
          {recipeDetail.readyInMinutes}min
        </Typography>
      </Box>
      <Box component="span">
        <Tooltip title="Health Score">
          <LoyaltyIcon sx={informationIcon} />
        </Tooltip>
        <Typography variant="h5" component="div">
          {recipeDetail.healthScore}
        </Typography>
      </Box>
    </>
  );
}
