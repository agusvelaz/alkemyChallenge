import Context from "../context/UserContext";
import loginServices from "../services/loginServices";
import { useContext, useState } from "react";

export default function useUser() {
  const {
    setTokenUser,
    menuUser,
    setMenuUser,
    recipesNoVegan,
    setRecipesNoVegan,
    recipesVegan,
    setRecipesVegan,
    totalPriceMenu,
    setTotalPriceMenu,
    avarageTimeMenu,
    setAvarageTimeMenu,
  } = useContext(Context);
  const [error, setError] = useState(null);
  const lS = window.localStorage;
  //login
  const login = (valueEmail, valuePassword) => {
    loginServices(valueEmail, valuePassword)
      .then((res) => {
        lS.setItem("tokenUser", res);
        setTokenUser(res);
        // console.log(res);
      })
      .catch((err) => {
        lS.removeItem("tokenUser");
        console.error(err);
        setError(err);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };
  const logout = () => {
    lS.removeItem("tokenUser");
    setTokenUser(null);
  };

  //menu
  const addMyMenu = (recipe) => {
    const isInMenuAlert = () => {
      alert(`"${recipe.title}" ya se encuentra en tu menu`);
    };
    const lengthMenuAlert = () => {
      alert(`Puedes agregar hasta 4 recetas maximo.`);
    };
    const isInMenu = menuUser.find((i) => i.id === recipe.id);
    if (isInMenu != null) {
      isInMenuAlert();
    } else if (menuUser.length >= 4) {
      lengthMenuAlert();
    } else {
      if (recipe.vegan) {
        if (recipesVegan < 2) {
          setRecipesVegan(recipesVegan + 1);
          setMenuUser([...menuUser, recipe]);
          alert(`Agregaste "${recipe.title}"`);
        } else {
          alert("Ya tienes 2 recestas veganas");
        }
      } else {
        if (recipesNoVegan < 2) {
          setRecipesNoVegan(recipesNoVegan + 1);
          setMenuUser([...menuUser, recipe]);
          alert(`Agregaste "${recipe.title}"`);
        } else {
          alert("Ya tienes 2 recestas no veganas");
        }
      }
    }
  };
  const deleteRecipe = (recipe) =>{
    console.log(recipe.id)
    if (recipe.vegan) {
      setRecipesVegan(recipesVegan - 1)
    } else{
      setRecipesNoVegan(recipesNoVegan - 1)
    }
    const newMenu = menuUser.filter((r) => r.id !== recipe.id);
    setMenuUser(newMenu)

  }
  const totalPrice = () => {
    let totalPrice = 0;
    menuUser?.map((r) => {
      totalPrice += r.pricePerServing;
    });
    return totalPrice;
  };
  const averageTime = () => {
    let totalTime = 0;
    menuUser?.map((r) => {
      totalTime += r.readyInMinutes;
    });
    return totalTime / menuUser.length;
  };
  const avarageHealthScore = () => {
    let totalHealthScore = 0;
    menuUser?.map((r) => {
      totalHealthScore += r.healthScore;
    });
    return totalHealthScore / menuUser.length;
  };
  return {
    isLogged: Boolean(window.localStorage.getItem("tokenUser")),
    login,
    logout,
    error,
    menuUser,
    recipesVegan,
    recipesNoVegan,
    addMyMenu,
    deleteRecipe,
    totalPrice,
    averageTime,
    avarageHealthScore,
  };
}
