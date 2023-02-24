import axios from "axios";

// -------- get all products ------
export const getAllProducts = () => {
  return axios.get(`https://fakestoreapi.com/products`);
};
