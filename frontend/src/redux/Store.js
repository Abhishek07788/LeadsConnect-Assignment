import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./cart/cart.reducer";
import { productReducer } from "./product/product.reducer";

const rootReducer = combineReducers({
  Product: productReducer,
  Cart: cartReducer,
});

export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));
