import {
  productLoading,
  productError,
  productGet,
  getSingle,
} from "./product.type";
import axios from "axios";

// -------- get all products ------
export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: productLoading });
  try {
    let res = await axios.get(`https://fakestoreapi.com/products`);
    dispatch({ type: productGet, payload: res.data });
  } catch (e) {
    dispatch({ type: productError });
  }
};

// ------------- get Product by id ----------
export const getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: productLoading });
  try {
    let res = await axios.get(`https://fakestoreapi.com/products/${id}`);

    dispatch({ type: getSingle, payload: res.data });
  } catch (e) {
    dispatch({ type: productError });
  }
};

// ------------- get Product by Category ----------
export const getProductByCategory = (category) => async (dispatch) => {
  dispatch({ type: productLoading });
  try {
    if (category === "all") {
      let res = await axios.get(`https://fakestoreapi.com/products`);
      dispatch({ type: productGet, payload: res.data });
    } else {
      let res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      dispatch({ type: productGet, payload: res.data });
    }
  } catch (e) {
    dispatch({ type: productError });
  }
};
