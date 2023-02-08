import { combineReducers } from "redux";
import calculetCategory from "./calculetCategory";
import userInfo from "./userInfo";
import calculetList from "./calculetList";

const rootReducer = combineReducers({
  calculetCategory,
  userInfo,
  calculetList,
});

export default rootReducer;
