import { combineReducers } from "redux";
import calculetCategory from "./calculetCategory";
import userInfo from "./userInfo";
import calculetList from "./calculetList";
import error from "./error";

const rootReducer = combineReducers({
  calculetCategory,
  userInfo,
  calculetList,
  error,
});

export default rootReducer;
