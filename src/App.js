import { BrowserRouter, Routes, Route,} from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar.js";
import Home from "./components/Home";
import RecipesDetail from "./components/RecipeList/RecipesDetail";
import { UserContextProvider } from "./context/UserContext";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
function App() {
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
