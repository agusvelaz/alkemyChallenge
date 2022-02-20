import React from "react";
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Paper } from "@mui/material";

import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

const listRecipesFoundContainer = {
  marginTop: 10,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
};
const cardRecipe = {
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between",
  alignItems:"center",
  width: 345,
  margin: 2,
  a:{
    textDecoration:"none"
  }
};
const vegan = {
  width:"200px",
  background: "#4caf50",
  margin:"auto"
}
const btnCard ={
  textDecoration:"none",
  margin:1
}


export default function ListRecipesFound({foundRecipes}) {
  const { addMyMenu } = useUser();
  return (
    <Box sx={listRecipesFoundContainer} maxWidth="xl">
      {foundRecipes?.map((recipe) => {
        return (
          <Card sx={cardRecipe} key={recipe.id}>
            <CardMedia
              component="img"
              alt={`${recipe.title}`}
              height="300"
              image={recipe.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {recipe.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recipe.vegan ? <Paper sx={vegan}>Vegan</Paper> : null}
              </Typography>
            </CardContent>
            <CardActions>
              <Button sx={btnCard}  disableElevation size="small" onClick={() => addMyMenu(recipe)}>
                Add My Menu
              </Button>
              <Link  to={`/recipe/${recipe.id}`}>
                <Button sx={btnCard}  disableElevation size="small">Detail</Button>
              </Link>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}
