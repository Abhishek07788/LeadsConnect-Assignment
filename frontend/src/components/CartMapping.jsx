import { Box, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  deleteSingleCart,
  getAllCarts,
  updateSingleCart,
} from "../redux/cart/cart.action";

const CartMapping = (props) => {
  const { id, title, price, image, quantity } = props;
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDelete = (id) => {
    // --- Alert --
    toast({
      title: "Please Wait..",
      status: "info",
      duration: 500,
      isClosable: true,
      position: "top",
    });
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

  // ---------- Quantity Increase ---------
  const handle_increase_quantity = (id, quantity, price) => {
    // --- Alert --
    toast({
      title: "Please Wait..",
      status: "info",
      duration: 500,
      isClosable: true,
      position: "top",
    });
    dispatch(
      updateSingleCart(
        id,
        quantity + 1,
        (quantity + 1) * Math.floor(price / quantity)
      )
    );
    setTimeout(() => {
      dispatch(getAllCarts());
    }, 900);
  };

  // ---------- Quantity Decrease ---------
  const handle_decrease_quantity = (id, quantity, price) => {
    if (quantity <= 1) {
      // --- Alert --
      toast({
        title: "Can't Decrease..",
        status: "error",
        duration: 1200,
        isClosable: true,
        position: "top",
      });
    } else {
      // --- Alert --
      toast({
        title: "Please Wait..",
        status: "info",
        duration: 500,
        isClosable: true,
        position: "top",
      });
      dispatch(
        updateSingleCart(
          id,
          quantity - 1,
          (quantity - 1) * Math.floor(price / quantity)
        )
      );
      setTimeout(() => {
        dispatch(getAllCarts());
      }, 900);
    }
  };

  return (
    <Box display="flex" bg="#ffff" p="3" borderRadius={10} gap="3" w="100%">
      <Image w="90px" h="110px" src={image} alt="img" />
      <Box w="100%">
        <Box display="flex" w="100%" justifyContent="space-between">
          <Text _hover={{ color: "red" }} fontSize="14">
            {title.slice(0, 50)}...
          </Text>

          {/* ------- Delete ----- */}
          <Text
            onClick={() => handleDelete(id)}
            color="red"
            fontSize="20"
            cursor="pointer"
          >
            <RiDeleteBinLine />
          </Text>
        </Box>
        <Box
          display="flex"
          gap="3"
          alignItems="center"
          fontWeight={500}
          fontSize={16}
          mt="2"
        >
          <Text
            onClick={() => handle_decrease_quantity(id, quantity, price)}
            cursor="pointer"
            border="1px solid grey"
            borderRadius={50}
            pr="2"
            pl="2"
          >
            -
          </Text>
          <Text border="1px solid grey" borderRadius={6} pr="3" pl="3">
            {quantity}
          </Text>
          <Text
            onClick={() => handle_increase_quantity(id, quantity, price)}
            cursor="pointer"
            border="1px solid grey"
            borderRadius={50}
            pr="2"
            pl="2"
          >
            +
          </Text>
        </Box>

        <Heading fontSize={18} mt="3" color={"red"}>
          ₹{Math.floor(price)}.00
        </Heading>
        <Text fontSize={14}>(Inclusive of all taxes)</Text>
      </Box>
    </Box>
  );
};

export default CartMapping;
