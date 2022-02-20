import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useUser from "../../hooks/useUser";
import theme from "../../assets/theme";
import imgLogin from "../../assets/login.jpg";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const backgroundLogin = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.493), rgb(0, 0, 0)100%), url(${imgLogin})`,
  backgroundSize: "cover",
};
const loginContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 2,
  backgroundColor: "white",
  margin: "auto",
  width: "500px",
  height: "96%",
};

export default function Login() {
  const { login, isLogged, error } = useUser();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        navigateTo("/");
      }, 1000);
    }
  }, [isLogged]);
  console.log(isLogged);
  const validateInputs = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required email";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
    ) {
      errors.email = "Invalid email ";
    }
    if (!values.password) {
      errors.password = "Required password";
    }
    // console.log(errors);
    return errors;
  };
  const handleSubmit = (values) => {
    login(values.email, values.password);
  };
  const initialValuesInput = {
    email: "",
    password: "",
  };

  return (
    <>
      <Box sx={backgroundLogin}>
        <Box sx={loginContainer}>
          <h1>Bienvenid@ a MPH</h1>
          <Typography>Inicie sesion para continuar 🚀</Typography>
          <Box>
            <Formik
              initialValues={initialValuesInput}
              validate={validateInputs}
              onSubmit={handleSubmit}
            >
              {({ errors, isSubmitting }) => (
                <Form>
                  {/* {console.log(isSubmitting)} */}
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <label>Email</label>
                    <Field name="email" type="email" onBlur={null} />
                    <ErrorMessage
                      name="email"
                      component={() => <small>{errors.email}</small>}
                    />
                    <label>Password</label>
                    <Field name="password" type="password" onBlur={null} />
                    <ErrorMessage
                      name="password"
                      component={() => <small>{errors.password}</small>}
                    />
                    <button
                      // disabled={isSubmitting}
                      type="submit"
                    >
                      Inicial
                    </button>
                    {error && (
                      <ErrorMessage component={() => <Typography>{`${error}`}</Typography>} />
                    )}
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
}

{/* <Paper sx={paperForm}>
  <Form>
    <Box>
      <IconButton disabled sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Field
        name="search"
        id="search"
        placeholder="Search Recipes"
        type="text"
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <Button color="inherit" type="submit">
        Search
      </Button>
    </Box>
  </Form>
</Paper>; */}
