import { combineReducers } from "redux";
import calculetCategory from "./calculetCategory";
import userInfo from "./userInfo";

const rootReducer = combineReducers({ calculetCategory, userInfo });

export default rootReducer;
