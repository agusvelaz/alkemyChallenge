import Context from "../context/UserContext";
import loginServices from "../services/loginServices";
import { useContext, useState } from "react";
import Swal from 'sweetalert2'

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
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  const lS = window.localStorage;
  //login
  const login = (valueEmail, valuePassword) => {
    setIsLoader(true);
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
        }, 3000);
      })
      .finally(() => {
        setIsLoader(false);
      });;
  };
  const logout = () => {
    lS.removeItem("tokenUser");
    setTokenUser(null);
  };

  //menu
  const addMyMenu = (recipe) => {
    //alerts
    const warningAlert = (msj) => {
      Swal.fire({
        icon: 'warning',
        // title: 'Oops...',
        html: `${msj}`,
        confirmButtonColor: '#000'
      })
    }; 
    const successAddAlert = () =>{
      Swal.fire({
        icon: 'success',
        // title: '',
        html: `You added <b>"${recipe.title}"</b> to your menu`,
        confirmButtonColor: '#000'
      })
    }

    //validate
    const isInMenu = menuUser.find((i) => i.id === recipe.id);
    if (isInMenu != null) {
      warningAlert(`<b>"${recipe.title}"</b> it's already on your menu.`);
    } else if (menuUser.length >= 4) {
      warningAlert(`You can only add 4 recipes maximum`);
    } else {
      if (recipe.vegan) {
        if (recipesVegan < 2) {
          setRecipesVegan(recipesVegan + 1);
          setMenuUser([...menuUser, recipe]);
          successAddAlert()
        } else {
          warningAlert("You already have 2 vegan recipes");
        }
      } else {
        if (recipesNoVegan < 2) {
          setRecipesNoVegan(recipesNoVegan + 1);
          setMenuUser([...menuUser, recipe]);
          successAddAlert()
        } else {
          warningAlert("You already have 2 non-vegan recipes");
        }
      }
    }
  };
  const deleteRecipe = (recipe) =>{
    // console.log(recipe.id)
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
    isLoader,
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
