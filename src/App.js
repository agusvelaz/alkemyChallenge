import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import useUser from "./hooks/useUser";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar.js";
import Home from "./components/Home";
import RecipesDetail from "./components/RecipeList/RecipesDetail";
import { UserContextProvider } from "./context/UserContext";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
function App() {
  const { isLoader } = useUser();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContextProvider>
          <div className="App">
          <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recipe/:id" element={<RecipesDetail />} />
            </Routes>
          </div>
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
