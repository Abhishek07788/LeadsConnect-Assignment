import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteSingleCart,
  getAllCarts,
  updateSingleCart,
} from "../../redux/cart/cart.action";

const DataMap = (props) => {
  const { id, title, price, image, quantity, category, description, rating } =
    props;
  const dispatch = useDispatch();
  const toast = useToast();

  //   --------- delete cart ----------
  const handleDelete = (id) => {
    dispatch(deleteSingleCart(id));
    setTimeout(() => {
      // --- Alert --
      toast({
        title: "Product Deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      dispatch(getAllCarts());
    }, 800);
  };

  //   --------- update quantity ---------
  const handleInput = (e) => {
    if (e.target.value)
      setTimeout(() => {
        dispatch(
          updateSingleCart(id, +e.target.value, +e.target.value * price)
        );
        setTimeout(() => {
          // --- Alert --
          toast({
            title: "Product updated",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          dispatch(getAllCarts());
        }, 2000);
      }, 1000);
  };

  return (
    <SimpleGrid
      bg="#ffff"
      p="3"
      display={["grid", "grid", "grid", "flex"]}
      gap="10"
      borderRadius={10}
      w="100%"
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
    >
      <Image
        w={["100%", "100%", "100%", "90px"]}
        h={["210px", "210px", "200px", "110px"]}
        src={image}
        alt="img"
      />
      <Box w="100%">
        <Text fontSize="16">{title.slice(0, 60)}...</Text>

        {/* --------- e.target.value - cart------ */}
        <Box
          display="flex"
          mt="1"
          gap={["20", "20", "12", "20"]}
          alignItems="canter"
        >
          <Text
            display="flex"
            alignItems="center"
            fontSize={20}
            mt="2"
            fontWeight={"bold"}
          >
            {rating.rate}
            <span style={{ color: "#fce259" }}>
              <AiTwotoneStar />
            </span>
          </Text>
          <InputGroup w="90px" h="8" mt="3">
            <InputLeftAddon
              fontSize={[12, 15, 15, 15]}
              pl="1"
              w="40%"
              children="Qty"
              h="8"
            />
            <Input
              onInput={handleInput}
              borderColor="#cecece"
              fontWeight={600}
              w={[16, 16, 20, 20]}
              type="number"
              defaultValue={quantity}
              h="8"
            />
          </InputGroup>
        </Box>

        <Text fontSize={21} fontWeight="550" mt="3" color={"#e84149"}>
          ₹{Math.floor(price)}.00
        </Text>

        {/* ---------- delete --- */}
        <Box display="flex" gap="1" fontSize={[16, 16, 16, 17]} mt="2">
          <Text
            onClick={() => handleDelete(id)}
            _hover={{ color: "red" }}
            cursor="pointer"
          >
            Delete
          </Text>
          <Text borderRight="3px solid #65ad1b" h="4" mt="1"></Text>
          <Link to="/">
            <Text _hover={{ color: "red" }}> Explore more like this</Text>
          </Link>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default DataMap;
