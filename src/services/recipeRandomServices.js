import axios from "axios";
import key from './key'
export default async function recipeRandomServices() {
  const ENDPOINT = `https://api.spoonacular.com/recipes/random?apiKey=${key}&number=20`;
  // console.log(query);
  try {
    const res = await axios.get(ENDPOINT);
    const { data } = res;
    return data.recipes;
  } catch (err) {
    throw new Error("err");
  }
}
