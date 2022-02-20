import { Typography, Box, Paper } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import useUser from "../../hooks/useUser";
import { StayPrimaryLandscape } from "@mui/icons-material";
const overviewContainer = {
  display: "flex",
  flexDirection: {xs:"column", sm:"row"},
  justifyContent: "space-evenly",
  margin: 2,
};
const information = {
  backgroundColor: "primary.main",
  color: "primary.contrastText",
  margin:.5,
  display:"flex",
  justifyContent:"center"
};
const informationIcon = {
  margin: 1,
  display: "flex",
  alignItems:"center",
  svg: {
    margin: "0 4px",
    color: "primary.light",
  },
};
export default function MenuOverview() {
  const {
    totalPrice,
    averageTime,
    avarageHealthScore,
    menuUser,
    recipesNoVegan,
    recipesVegan,
  } = useUser();
  console.log(menuUser);
  console.log("Vegans: " + recipesVegan);
  console.log("No vegans: " + recipesNoVegan);

  return (
    <Box sx={overviewContainer}>
      <Paper sx={information}>
        <Typography sx={informationIcon}>
          Total Price: <MonetizationOnIcon /> {totalPrice().toFixed(2)}
        </Typography>
      </Paper>
      <Paper sx={information}>
        <Typography sx={informationIcon}>
          Average preparation time:
          <AccessTimeFilledIcon /> {averageTime().toFixed(2)} min
        </Typography>
      </Paper>
      <Paper sx={information}>
        <Typography sx={informationIcon}>
          Average Health Score: <LoyaltyIcon />
          {avarageHealthScore().toFixed(2)}
        </Typography>
      </Paper>
    </Box>
  );
}
