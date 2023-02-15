import { combineReducers } from "redux";
import calculetCategory from "./calculetCategory";
import userInfo from "./userInfo";
import calculetList from "./calculetList";
import error from "./error";
import loading from "./loading";
import snackbar from "./snackbar";

const rootReducer = combineReducers({
  calculetCategory,
  userInfo,
  calculetList,
  error,
  loading,
  snackbar,
});

export default rootReducer;
