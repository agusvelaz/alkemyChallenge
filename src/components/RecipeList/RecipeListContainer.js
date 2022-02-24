import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Loader from "../Loader";
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";
import recipeRandomServices from '../../services/recipeRandomServices'


const recipeListContainer ={
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
}

export default function MenuList() {
  const [isLoader, setIsLoader] = useState(true);
  const [foundRecipes, setFoundRecipes] = useState("");
  useEffect(() => {
    setIsLoader(true);
    recipeRandomServices()
      .then((res) => {
        setFoundRecipes(res);
        // console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  return (
    <Box sx={recipeListContainer}>
      <SearchBar setFoundRecipes={setFoundRecipes} setIsLoader={setIsLoader}/>
      {isLoader ? (
        <Loader />
      ) : (<RecipeList foundRecipes={foundRecipes} id="menuList"/>)}
      
    </Box>
  );
}
