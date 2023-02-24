import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../pages/Cart";
import Products from "../pages/Products";
import SingleProduct from "../pages/SingleProduct";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/details/:id" element={<SingleProduct />} />
    </Routes>
  );
};

export default AllRoutes;
