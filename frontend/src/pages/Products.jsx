import { Grid, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../apis/Api";
import Carousel from "../components/Carousel";
import Mapping from "../components/ProductMapping";

const Products = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(true);
      });
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
        {loading ? (
          <Heading color="teal" textAlign="center" fontSize="20" mt="3">
            loading please wait...
          </Heading>
        ) : (
          ""
        )}

        {/* ---------- mapping all products ----- */}
        <SimpleGrid columns={[2, 2, 4, 4]} spacing="10" mt="10">
          {data && data.map((el) => <Mapping key={el.id} {...el} />)}
        </SimpleGrid>
      </Grid>
    </SimpleGrid>
  );
};

export default Products;
