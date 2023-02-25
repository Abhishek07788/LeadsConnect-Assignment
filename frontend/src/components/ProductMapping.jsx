import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";
import { addToCart, getAllCarts } from "../redux/cart/cart.action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductMapping = (props) => {
  const { id, description, category, title, price, image, rating, cartData } =
    props;
  const [qty, setQty] = useState(1);
  const toast = useToast();
  const dispatch = useDispatch();

  // ---------- add to cat ----------
  const handle_cart_click = (cart) => {
    dispatch(getAllCarts());
    if (qty <= 0) {
      // --- Alert --
      toast({
        title: "Can't add with less than 1 quantity !!",
        status: "error",
        duration: 2000,
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
      // ---------- checking if data already exist in cart or not ------
      setTimeout(() => {
        if (
          cartData &&
          cartData.filter((el) => el.title === cart.title).length >= 1
        ) {
          // --- Alert --
          toast({
            title: "Product already Added in your cart!!",
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        } else {
          dispatch(
            addToCart({
              ...cart,
              quantity: +qty,
              price: qty * cart.price,
            })
          );
          // --- Alert --
          toast({
            title: "Product added to cart",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {
            dispatch(getAllCarts());
          }, 700);
        }
      }, 500);
    }
  };

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
        <Link to={`/details/${id}`}>
          <Image
            mb="2"
            w="100%"
            h="260px"
            borderRadius={10}
            src={image}
            alt={title}
          />
        </Link>

        {/* -------- title, price, rating -------- */}
        <hr />
        <Link to={`/details/${id}`}>
          <Text fontWeight={500} h="60px">
            {title.slice(0, 50)}....
          </Text>
        </Link>
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
        <Text mt="2 ">(Inclusive of all taxes)</Text>
        <Heading fontSize={20} color="#333e48">
          ₹{Math.floor(price)}.00 <span style={{ fontSize: "10px" }}> MRP</span>
        </Heading>

        {/* --------- qty - cart------ */}
        <Box display="flex" mt="1" justifyContent="space-between">
          <InputGroup w="90px">
            <InputLeftAddon
              fontSize={[12, 15, 18, 18]}
              pl="1"
              w="40%"
              children="Qty"
            />
            <Input
              onChange={(e) => setQty(e.target.value)}
              borderColor="#cecece"
              fontWeight={600}
              w={[10, 10, 19, 19]}
              color="#333e48"
              fontSize={20}
              type="number"
              defaultValue={1}
            />
          </InputGroup>
          <Button
            // -------- adding data to cart ------
            onClick={() =>
              handle_cart_click({
                description,
                category,
                title,
                price,
                image,
                rating,
              })
            }
            bg="#e73841"
            color="#ffff"
            _hover={{ bg: "#f04244" }}
            borderRadius={10}
            fontSize={[12, 12, 18, 18]}
            pl="1"
            pr="1"
          >
            <BsCart style={{ color: "#ffff" }} />
            &nbsp; ADD
          </Button>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default ProductMapping;
