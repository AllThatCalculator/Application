import { combineReducers } from "redux";
import calculetCategory from "./calculetCategory";
import userInfo from "./userInfo";
import calculetList from "./calculetList";
import error from "./error";
import loading from "./loading";
import snackbar from "./snackbar";
import calculetRecord from "./calculetRecord";
import search from "./search";
import calculetBookmark from "./calculetBookmark";

const rootReducer = combineReducers({
  calculetCategory,
  userInfo,
  calculetList,
  error,
  loading,
  snackbar,
  calculetRecord,
  search,
  calculetBookmark,
});

export default rootReducer;
