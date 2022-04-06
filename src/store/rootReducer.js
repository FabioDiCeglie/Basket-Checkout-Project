import { combineReducers } from "redux";
import productsReducer from "./products/reducer";
import basketReducer from "./basket/reducer";

export default combineReducers({
  products: productsReducer,
  basket: basketReducer,
});
