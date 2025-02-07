import React, { useState, useCallback } from "react";
import useStyles from "./style";
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import loginApi from "../../Services/Login";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../Redux/SnackBar/actions";
import { showLoader, hideLoader } from "../../Redux/Loader/actions";
import { setAuthentication } from "../../Redux/Authentication/actions";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const handleLogin = (formValues) => {
    dispatch(showLoader("Loading please wait..."));
    const data = {
      email: formValues?.email,
      password: formValues?.password
    };

    const onSuccess = (res) => {
      dispatch(hideLoader());
      console.log("fetched data--->",res?.data?.data);
      dispatch(setAuthentication(res?.data?.data));
      dispatch(
        showSnackbar({
          message: res?.data?.message || "Logged in successfully",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "success",
        })
      );
      navigate("/chatroom");
    };
    const onFailure = (err) => {
      dispatch(
        showSnackbar({
          message: err?.response?.data?.message || "Failed to fetch data",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "error",
        })
      );
      dispatch(hideLoader());
      //console.log("Login Api", err);
    };
    loginApi.login({ ...data }).then(onSuccess, onFailure);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
  email: yup
  .string()
  .email("Invalid email format") // Ensures valid email format
  .required("Email is required")
  .nullable(),
  password: yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
  .required("Password is required")
  .nullable(),
    }),
    onSubmit: handleLogin,
  });

  // Theme primary color

  return (
    <>
      <form style={{ width: "100%" }} autoComplete="off" >
        <Grid item container className={classes.root}>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            lg={7}
            xl={7}
            className={classes.loginImageContainer}
          >
            <img
              src="/assets/images/Conversation-rafiki.png"
              alt="login-image"
              className={classes.loginPageImage}
            />
            <div className={classes.overlayText}>
              <div className={classes.gridContainer}>
                <div className={classes.gridItem}>
                  <Typography variant="h3">
                    Let's Chat
                    <span className={classes.highlightText}> With</span>
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <Typography variant="h1" className={classes.boldText}>
                    MAI
                  </Typography>
                </div>
              </div>
              <div className={classes.gridContainer}>
                <div className={classes.gridItem}>
                  <Typography variant="h3">
                    <span className={classes.highlightTextBig}>Be Social</span> &
                    Entertain
                  </Typography>
                </div>
                <div className={classes.gridItem}>
                  <Typography variant="h3">Friends!!!</Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={11} sm={5} className={classes.loginContainer}>
            <Grid
              container
              flexDirection={"column"}
              className={classes.loginWrapper}
            >
              <Grid item xs={12} className={classes.imgContainer}>
                <img
                  src="/assets/images/logos/Mai.png"
                  alt="mai_logo"
                  className={classes.logo}
                />
              </Grid>
              <h2 style={{ fontStyle: "bold" }}>Sign In</h2>
              <br></br>
              <Grid item xs={12} sm={8} className={classes.gridFields}>
                <TextField
                  name="email"
                  id="email"
                  value={formik?.values?.email}
                  onChange={formik?.handleChange}
                  type={"text"}
                  fullWidth
                  variant="outlined"
                  label="UserEmail*"
                  autoFocus
                  error={formik?.errors?.email && formik?.touched?.email}
                  helperText={
                    formik?.errors?.email &&
                    formik?.touched?.email &&
                    formik?.errors?.email
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} className={classes.gridFields}>
                <TextField
                  name="password"
                  id="password"
                  value={formik?.values?.password}
                  onChange={formik?.handleChange}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  label="Password*"
                  error={formik?.errors?.password && formik?.touched?.password}
                  helperText={
                    formik?.errors?.password &&
                    formik?.touched?.password &&
                    formik?.errors?.password
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.password}
                      >
                        {showPassword ? (
                          <VisibilityIcon
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <VisibilityOffIcon
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <br></br>

              <Grid item
                container
                xs={12}
                sm={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item xs={6} sm={6} md={4} lg={4} xl={6}>
                  <Button
                    type={"submit"}
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={formik?.handleSubmit}
                    style={{ padding: "10px", borderRadius: "25px" }}
                  >
                    Sign In
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className={classes.forgotPassWord}
                >
                <Button
                    type={"button"}
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={() => navigate("/register")}
                    style={{ padding: "10px", borderRadius: "25px" }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
              <br></br>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
