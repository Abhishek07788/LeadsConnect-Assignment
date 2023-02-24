import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsCart } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";

const Mapping = (props) => {
  const { title, price, image, rating } = props;

  return (
    <SimpleGrid
      p="3"
      textAlign="left"
      borderRadius={10}
      border={"1px solid #dfe8f9"}
      pb="5"
    >
      <Box>
        {/* ------- Image ------ */}
        <Image
          mb="2"
          w="100%"
          h="260px"
          borderRadius={10}
          src={image}
          alt={title}
        />

        {/* -------- title, price, rating -------- */}
        <hr />
        <Text fontWeight={500} h="60px">
          {title.slice(0, 50)}....
        </Text>

        <Box display="flex" justifyContent="space-between">
          <Text
            display="flex"
            alignItems="center"
            fontSize={18}
            mt="2"
            fontWeight={"bold"}
          >
            {rating.rate}
            <span style={{ color: "#fce259" }}>
              <AiTwotoneStar />
            </span>
          </Text>
          <Text mt="2" color="#565e59">
            ({rating.count} costumers)
          </Text>
        </Box>
        <Text mt="5">(Inclusive of all taxes)</Text>

        {/* ---------- Cart button ------- */}
        <Box display="flex" justifyContent="space-between">
          <Heading fontSize={18} mt="2">
            ₹{Math.floor(price)}.00{" "}
            <span style={{ fontSize: "10px" }}> MRP</span>
          </Heading>
          <Button bg="#e73841" color="#ffff" _hover={{ bg: "#f04244" }}>
            <BsCart />
            &nbsp; ADD
          </Button>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default Mapping;
