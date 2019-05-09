import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  streams: streamReducer,

  // Redux Form -- create form reducer to serve for all the Form Components
  form: formReducer
});
