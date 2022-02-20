import { useState, createContext } from "react";

const Context = createContext({});

export function UserContextProvider({ children }) {
  const [tokenUser, setTokenUser] = useState(() =>
    window.localStorage.getItem("tokenUser")
  );
  const [menuUser, setMenuUser] = useState([]);
  const [totalPriceMenu, setTotalPriceMenu] = useState(0)
  const [avarageTimeMenu , setAvarageTimeMenu ] = useState(0)
  const [recipesVegan, setRecipesVegan] = useState(0);
  const [recipesNoVegan, setRecipesNoVegan] = useState(0);

  return (
    <Context.Provider
      value={{
        tokenUser,
        setTokenUser,
        menuUser,
        setMenuUser,
        recipesVegan,
        setRecipesVegan,
        recipesNoVegan,
        setRecipesNoVegan,
        totalPriceMenu, 
        setTotalPriceMenu,
        avarageTimeMenu , 
        setAvarageTimeMenu
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
