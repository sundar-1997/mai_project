import { createStore } from "redux";
// import { composeWithDevTools } from "react-devtools";
import { combineReducers, applyMiddleware } from "redux";
import loggerMiddleware from "../Middleware/index";
// import rootReducer from "../rootReducer";

import Prompt from "../SnackBar/reducer";
import Loader from "../Loader/reducer";
import AuthReducer from "../Authentication/reducer";
// import TabReducer from "Pages/Modals/Driver/Create/Redux/Reducer";


const combinedReducers = combineReducers({
  snackbar: Prompt,
  Loader: Loader,
  AuthReducer: AuthReducer
});

//
// Apply middleware
const middleware = applyMiddleware(loggerMiddleware);

// Create the store with devtools and middleware
const store = createStore(combinedReducers);

export default store;
