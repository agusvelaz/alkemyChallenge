import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Container,
  Paper,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import recipeSearchServices from "../../services/recipeSearchServices";

const formContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};
const paperForm = {
  margin: 3,
  "& form": {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: { xs: 300, sm: 400 },
  },
  "& input": {
    color: "black",
    width: "100%",
    border: "0",
    marginLeft: 1,
    flex: 1,
    outline: "none",
  },
  "& input:focus": {
    border: 0,
  },
};

export default function SearchBar(props) {
  // console.log(props)

  // SEARCH RESULT
  const search = (query) => {
    props.setIsLoader(true);
    recipeSearchServices(query)
      .then((res) => {
        props.setFoundRecipes(res);
        // console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        props.setIsLoader(false);
      });
  };

  // VALIDATE INPUTS
  const validateInputs = (values) => {
    const errors = {};
    if (values.search.length <= 2) {
      errors.search = "You must enter more than 2 characters in the search";
    }
    console.error(errors.search);
    return errors;
  };
  const handleSubmit = (values) => {
    // console.log(values);
    search(values.search);
  };
  const initialValuesInput = {
    search: "",
  };
  return (
    <AppBar position="static">
      <Container sx={{ padding: "0" }} maxWidth="xl">
        <Toolbar sx={{ padding: "0" }}>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Formik
              initialValues={initialValuesInput}
              validate={validateInputs}
              onSubmit={handleSubmit}
            >
              {({ errors }) => (
              
                <Box sx={formContainer}>
                  <Paper sx={paperForm}>
                    <Form>
                      <IconButton
                        disabled
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <Field
                        name="search"
                        id="search"
                        placeholder="Search Recipes"
                        type="text"
                        onBlur={null}
                      />
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />

                      <Button color="inherit" type="submit">
                        Search
                      </Button>
                    </Form>
                  </Paper>
                  {errors.search && (
                    <Snackbar
                      open
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      
                    >
                      <Alert severity="warning" sx={{ width: "100%" }}>
                        {errors.search}
                      </Alert>
                      
                  
                    </Snackbar>
                  )}
                </Box>
              )}
            </Formik>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
