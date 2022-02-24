import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useUser from "../../hooks/useUser";
import imgLogin from "../../assets/login.jpg";
import { Typography, Box, Button, IconButton, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Swal from "sweetalert2";

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
  height: "99%",
  "& small":{
    backgroundColor:"error.main",
    width: 220,
    height:20,
    color:"white"   
  },
};

const paperForm = {
  margin: 1,
  border: "1px solid #80808059",
  display: "flex",
  "&:focus-within": {
    border: 0,
    border: "1px solid black",
  },
  "& form": {
    display: "flex",
    alignItems: "center",
    width: 300
  },
  "& input": {
    width: "100%",

    border: 0,
    flex: 1,
    outline: "none",
  },
};

export default function Login() {
  const { login, isLogged, error, isLoader } = useUser();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        navigateTo("/");
      }, 1000);
    }
  }, [isLogged]);

  const alertLogin = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
  };
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
    console.error(errors);
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
          <Box m={2}>
            <Typography variant="h3" m={2}>
              Welcome to MPH{" "}
            </Typography>
            <Typography variant="h5">Login to continue 🚀</Typography>
          </Box>
          <Box>
            <Formik
              initialValues={initialValuesInput}
              validate={validateInputs}
              onSubmit={handleSubmit}
            >
              {({ errors }) => (
                <Form>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Box sx={paperForm}>
                      <IconButton
                        disabled
                        sx={{ p: "10px" }}
                        aria-label="email"
                      >
                        <EmailIcon />
                      </IconButton>
                      <Field
                        placeholder="Email"
                        name="email"
                        type="email"
                        onBlur={null}
                      />
                    </Box>

                    

                    <Box sx={paperForm}>
                      <IconButton
                        disabled
                        sx={{ p: "10px" }}
                        aria-label="email"
                      >
                        <LockIcon />
                      </IconButton>
                      <Field
                        id="password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onBlur={null}
                      />
                    </Box>

                    <ErrorMessage
                      name="password"
                      component={() => <small>{errors.password}</small>}
                    />

                    <Button
                      disabled={isLoader}
                      type="submit"
                      variant="contained"
                      sx={{margin:2}}
                    >
                      Login
                    </Button>
                    {error && alertLogin()}
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

{
  /* <Paper sx={paperForm}>
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
</Paper>; */
}
