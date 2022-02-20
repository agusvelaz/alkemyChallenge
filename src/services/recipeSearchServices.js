import axios from "axios";
import key from './key'
// ${process.env.REACT_APP_KEY_API}
export default async function recipeSearchServices(query) {
  const ENDPOINT = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${query}&addRecipeNutrition=true&number=20`;
  // console.log(query);
  try {
    const res = await axios.get(ENDPOINT);
    const { data } = res;
    return data.results;
  } catch (err) {
    throw new Error("err");
  }
}
