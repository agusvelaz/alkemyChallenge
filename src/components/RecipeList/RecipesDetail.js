import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import recipeDetailService from "../../services/recipeDetailService";
import RecipeInfo from "./RecipeInfo";
import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  ListItem,
  ListItemText,
  Card,
  Button,
  CardActions,
} from "@mui/material";
import useUser from "../../hooks/useUser";

import Loader from "../Loader";
import { Link } from "react-router-dom";

const bigContainer = {
  display: "flex",
  flexDirection: "column",
  margin: "auto",
};
const backToList = {
  margin: "20px auto 10px",
  display: "flex",
  maxWidth: "lg",
  justifyContent: "start",
  a: {
    textDecoration: "none",
  },
};
const cardRecipe = {
  maxWidth: "lg",
  height: { md: 600, xs: "auto" },
  margin: { xl: "20px  auto", sm: "0px 50px 20px 50px" },
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: { xs: "center", lg: "normal" },
  justifyContent: "space-evenly",
  padding: "15px",
};
const recipeImg = { width: { xs: "100%", md: 600 }, margin: 1 };
const cardContent = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: "8px",
  h3: {
    fontSize: { xs: "30px", md: "3rem" },
  },
};
const information = {
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
const diets = {
  display: "flex",
  justifyContent: "space-evenly",
  div: {
    margin: "0 20px",
    textAlign: "center",
  },
};
const ingredientsContainer = {
  maxWidth: "lg",
  margin: { xl: "20px  auto", sm: "0px 50px 20px 50px" },
  padding: "15px",
};
const ingredients = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  div: {
    margin: 1,
  },
};

export default function RecipesDetail() {
  const { addMyMenu } = useUser();
  const [isLoader, setIsLoader] = useState(true);
  const [recipeDetail, setRecipeDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setIsLoader(true);
    recipeDetailService(id)
      .then((res) => {
        setRecipeDetail(res);
        // console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, [id]);
  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <Box>
          <Box sx={bigContainer}>
            <Box>
              <Box sx={backToList}>
                <Link to="/">Back to recipe list</Link>
              </Box>

              <Card sx={cardRecipe}>
                <CardMedia
                  component="img"
                  alt={recipeDetail.title}
                  sx={recipeImg}
                  image={recipeDetail.image}
                />
                <CardContent sx={cardContent}>
                  <Typography variant="h3" component="h3">
                    {recipeDetail.title}
                  </Typography>
                  <Box sx={information}>
                    <RecipeInfo recipeDetail={recipeDetail} />
                  </Box>
                  <Box sx={diets}>
                    <ListItem>
                      <ListItemText
                        primary="Vegan"
                        secondary={recipeDetail.vegan ? "si" : "no"}
                      />
                      <ListItemText
                        primary="Vegetarian"
                        secondary={recipeDetail.vegetarian ? "si" : "no"}
                      />
                      <ListItemText
                        primary="Gluten Free"
                        secondary={recipeDetail.glutenFree ? "si" : "no"}
                      />
                      <ListItemText
                        primary="Dairy Free"
                        secondary={recipeDetail.dairyFree ? "si" : "no"}
                      />
                    </ListItem>
                  </Box>
                  <CardActions>
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={() => addMyMenu(recipeDetail)}
                    >
                      Add My Menu
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Box>
            <Card sx={ingredientsContainer}>
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  Ingredients:
                </Typography>
                <ListItem sx={ingredients}>
                  {recipeDetail.extendedIngredients.map((i) => (
                    <ListItemText key={i.id} primary={i.nameClean} />
                  ))}
                </ListItem>
              </Box>
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
}
