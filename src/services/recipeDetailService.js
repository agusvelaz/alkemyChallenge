import axios from "axios";
import key from './key'
export default async function recipeDetailService(id) {
  // console.log(`search id: ${id}`)
  const ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`;
  // console.log(id);
  try {
    const res = await axios.get(ENDPOINT);
    const { data } = res;

    return data;
  } catch (err) {
    throw new Error("err");
  }
}
