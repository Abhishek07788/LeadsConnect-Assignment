import {
  cartLoading,
  cartError,
  cartGet,
  getSingle,
  cartSet,
  cartDelete,
  cartUpdate,
} from "./cart.type";
import axios from "axios";

// -------- get all carts ------
export const getAllCarts = () => async (dispatch) => {
  dispatch({ type: cartLoading });
  try {
    let res = await axios.get(`https://clam-kilt.cyclic.app/cart`);
    dispatch({ type: cartGet, payload: res.data });
  } catch (e) {
    dispatch({ type: cartError });
  }
};

// ------------- get cart by id ----------
export const getSingleCart = (id) => async (dispatch) => {
  dispatch({ type: cartLoading });
  try {
    let res = await axios.get(`https://clam-kilt.cyclic.app/cart/${id}`);
    dispatch({ type: getSingle, payload: res.data });
  } catch (e) {
    dispatch({ type: cartError });
  }
};

// ------------- add to cart ----------
export const addToCart = (data) => async (dispatch) => {
  dispatch({ type: cartLoading });
  try {
    await axios.post(`https://clam-kilt.cyclic.app/cart`, data);
    dispatch({ type: cartSet });
  } catch (e) {
    dispatch({ type: cartError });
  }
};

// ------------- delete single cart by id ----------
export const deleteSingleCart = (id) => async (dispatch) => {
  dispatch({ type: cartLoading });
  try {
    await axios.delete(`https://clam-kilt.cyclic.app/cart/${id}`);
    dispatch({ type: cartDelete });
  } catch (e) {
    dispatch({ type: cartError });
  }
};

// ------------- update single cart by id ----------
export const updateSingleCart = (id, quantity, price) => async (dispatch) => {
  dispatch({ type: cartLoading });
  try {
    await axios.patch(`https://clam-kilt.cyclic.app/cart/${id}`, {
      quantity: quantity,
      price: price,
    });
    dispatch({ type: cartUpdate });
  } catch (e) {
    dispatch({ type: cartError });
  }
};
