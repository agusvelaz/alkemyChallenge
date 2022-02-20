import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import RecipeInfo from "../RecipeList/RecipeInfo";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

const cardRecipe = {
  display: "flex",
  margin: "10px auto",
  alignItems:"center",
  width: {xs:"400px",sm:"auto"},
  flexDirection: {xs:"column", sm:"row"},
  a: {
    textDecoration: "none",
  },
};
const recipeImg = {
  width: {xs:"400px",sm:"300px", md:"250px"},
};
const cardInfo ={
  display:"flex",
  flexDirection: {xs:"column", md:"row"},
  margin:"0 auto",
  alignItems:"center"
}
const cardContent = {
  width: {xs:"300px",sm:"400px", md:"500px"},
  paddingTop: 1,
};
const recipeInformation = {
  display: "flex",
  justifyContent: "space-evenly",
  margin: "30px",
  span: {
    display: "flex",
    margin: "0 20px",
  },
  svg: {
    color: "#00000099",
  },
};
const vegan = {
  width: "200px",
  background: "#4caf50",
  margin: "auto",
};
export default function ListRecipesMenu() {
  const { menuUser, deleteRecipe } = useUser();
  return (
    <Box>
      {menuUser.map((recipe) => {
        return (
          <Card sx={cardRecipe} key={recipe.id}>
            <CardMedia
              component="img"
              image={recipe.image}
              sx={recipeImg}
              alt={recipe.title}
            />
            <Box sx={cardInfo}>
            <CardContent sx={cardContent}>
              <Typography variant="h6" component="div">
                {recipe.title}
              </Typography>
              <Box sx={recipeInformation}>
                <RecipeInfo recipeDetail={recipe} />
              </Box>
              <Box>{recipe.vegan ? <Paper sx={vegan}>Vegan</Paper> : null}</Box>
            </CardContent>
            <CardActions>
              <Link to={`/recipe/${recipe.id}`}>
                <Button size="small">Detail</Button>
              </Link>
              <Button size="small" onClick={() => deleteRecipe(recipe)}>
                Delete
              </Button>
            </CardActions>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}
