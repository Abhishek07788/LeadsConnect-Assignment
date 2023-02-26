import React from "react";
import { Route, Routes } from "react-router-dom";
import CartPage from "../components/cart_page/CartPage";
import Products from "../components/product_page/Products";
import SingleProduct from "../components/SingleProduct";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/details/:id" element={<SingleProduct />} />
    </Routes>
  );
};

export default AllRoutes;
