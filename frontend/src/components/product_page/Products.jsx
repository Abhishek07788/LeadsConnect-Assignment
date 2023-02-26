import {
  Grid,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Carousel from "./Carousel";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/product/product.action";
import { getAllCarts } from "../../redux/cart/cart.action";
import ProductsMap from "./ProductsMap";
const Products = () => {
  const { productData } = useSelector((store) => store.Product);
  const { error, cartData } = useSelector((store) => store.Cart);
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
        {/* ---------- error indicator -------- */}
        {error ? (
          <Heading color="teal" fontSize={20} textAlign="center">
            server error please refresh the page...
          </Heading>
        ) : (
          ""
        )}

        {/* ---------- mapping all products ----- */}
        {productData.length === 0 ? (
          <Stack w="90%" m="auto">
            <Heading color="green" textAlign="center" fontSize="25" mt="3">
              data loading please wait...
            </Heading>
            <Skeleton h="26px" />
            <Skeleton h="60px" />
            <Skeleton h="26px" />
          </Stack>
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing="10" mt="10">
            {productData &&
              productData.map((el) => (
                <ProductsMap key={el.id} {...el} cartData={cartData} />
              ))}
          </SimpleGrid>
        )}
      </Grid>
    </SimpleGrid>
  );
};

export default Products;
