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
import ResgiterApi from "../../Services/Register";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../Redux/SnackBar/actions";
import { showLoader, hideLoader } from "../../Redux/Loader/actions";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const handleLogin = (formValues) => {
    dispatch(showLoader("Loading please wait..."));
    const data = {
      email: formValues?.email,
      password: formValues?.password,
      username: formValues.username
    };

    const onSuccess = (res) => {
      dispatch(hideLoader());
      dispatch(
        showSnackbar({
          message: res?.data?.message || "Registration successfully",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "success",
        })
      );
      navigate("/");
    };
    const onFailure = (err) => {
      console.log('err?.response?.data?--->',err?.response?.data);
      const errorMessage = err?.response?.data?.data
  ?.map((error) => error.msg)
  .join(", ") || "Failed to fetch data";
      dispatch(
        showSnackbar({
          message: errorMessage || "Failed to fetch data",
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
    ResgiterApi.register({ ...data }).then(onSuccess, onFailure);
  };

  const formik = useFormik({
    initialValues: {
      username:"",
      email: "",
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      username: yup
      .string()
      .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Username can only contain letters and single spaces (not at start or end)")
      .required("Username is required")
      .nullable(),
  
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

      confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
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
          <Grid item xs={11} sm={5} className={classes.registerContainer}>
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
              <h2 style={{ fontStyle: "bold" }}>Register</h2>
              <br></br>
              <Grid item xs={12} sm={8} className={classes.gridFields}>
                <TextField
                  name="username"
                  id="username"
                  value={formik?.values?.username}
                  onChange={formik?.handleChange}
                  type={"text"}
                  fullWidth
                  variant="outlined"
                  label="Username*"
                  autoFocus
                  error={formik?.errors?.username && formik?.touched?.username}
                  helperText={
                    formik?.errors?.username &&
                    formik?.touched?.username &&
                    formik?.errors?.username
                  }
                />
              </Grid>
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
                  autoComplete="new-password"
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
              <Grid item xs={12} sm={8} className={classes.gridFields}>
                <TextField
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  label="Confirm Password*"
                  error={formik.errors.confirmPassword && formik.touched.confirmPassword}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showConfirmPassword ? (
                          <VisibilityIcon onClick={() => setShowConfirmPassword(false)} />
                        ) : (
                          <VisibilityOffIcon onClick={() => setShowConfirmPassword(true)} />
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
                    type={"submit"}
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={formik?.handleSubmit}
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
