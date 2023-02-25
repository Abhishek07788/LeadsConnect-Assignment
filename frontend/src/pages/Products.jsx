import { Grid, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/product/product.action";
import { getAllCarts } from "../redux/cart/cart.action";
import ProductMapping from "../components/ProductMapping";
const Products = () => {
  const { Loading, Error, productData } = useSelector((store) => store.Product);
  const { error, loading, cartData } = useSelector((store) => store.Cart);
  const dispatch = useDispatch();

  // ---------- get product & cart data ---------
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCarts());
  }, []);

  return (
    <SimpleGrid bg="#f1f3f8" w="90%" m="auto" borderRadius={10}>
      {/* -------- Carousel ------ */}
      <Carousel />

      {/* -------- Products ------ */}
      <Grid
        w="95%"
        m="auto"
        mt="4"
        bg="#ffff"
        borderRadius={10}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        p="5"
      >
        <Text borderBottom={"1px solid #dbdbdb"} mt="20"></Text>
        <Text
          m="auto"
          mt="-5"
          fontSize={25}
          border="1px solid #dbdbdb"
          w="220px"
          borderRadius={50}
          fontWeight={"bold"}
          bg="#ffff"
        >
          Deal of <span style={{ color: "red" }}>The Day</span>
        </Text>

        {/* ---------- loading indicator -------- */}
        {loading || Loading ? (
          <Heading color="green" textAlign="center" fontSize="20" mt="3">
            loading please wait...
          </Heading>
        ) : (
          ""
        )}
        {/* ---------- error indicator -------- */}
        {error || Error ? (
          <Heading color="teal" fontSize={20} textAlign="center">
            server error please refresh the page...
          </Heading>
        ) : (
          ""
        )}

        {/* ---------- mapping all products ----- */}
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="10" mt="10">
          {productData &&
            productData.map((el) => (
              <ProductMapping key={el.id} {...el} cartData={cartData} />
            ))}
        </SimpleGrid>
      </Grid>
    </SimpleGrid>
  );
};

export default Products;
