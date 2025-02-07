import { ACTION_TYPES } from "../../../Constants";
import _ from "lodash";

const isTokenValid = () => {
  const expiration = localStorage.getItem("tokenExpiration");
  return expiration && Date.now() < parseInt(expiration, 10);
};

const initialState = {
  isAuthenticated: isTokenValid(),
  token: localStorage.getItem("token") || null,
  menuToggle: false,
  username: localStorage.getItem("username") || "",
  userid:localStorage.getItem("userid") || "" // Assuming that username is stored in local storage
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {

    case ACTION_TYPES.AUTH: {
      if (!_.isEmpty(action?.payload?.token)) {
        console.log('action?.payload--->',action?.payload);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("token", action.payload?.token);
        localStorage.setItem("username", action.payload?.username)
        localStorage.setItem("tokenExpiration", Date.now() + 1 * 24 * 60 * 60 * 1000);
        localStorage.setItem("userid", action.payload?._id)
      }
      const isTokenValid = Date.now() < parseInt(localStorage.getItem("tokenExpiration"), 10);
      console.log("isTokenValid-->",isTokenValid);
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action?.payload?.token) && isTokenValid ? true : false,
        token: action.payload?.token,
        username: localStorage.getItem("username") || "",
        userid: localStorage.getItem("userid") || "" // Assuming that username is stored in local storage
      };
    }
    case ACTION_TYPES.MENU_TOGGLE: {
      return {
        ...state,
        menuToggle: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
